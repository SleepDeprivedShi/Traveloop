import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy } from "firebase/firestore";
import { User } from "firebase/auth";

export interface Trip {
  id: string;
  userId: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  coverPhoto?: string;
  isPublic: boolean;
  createdAt: string;
}

export function useTrips(user: User | null) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTrips([]);
      setLoading(false);
      return;
    }

    const fetchTrips = async () => {
      const q = query(
        collection(db, "trips"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const tripsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Trip));
      setTrips(tripsData);
      setLoading(false);
    };

    fetchTrips();
  }, [user]);

  const createTrip = async (trip: Omit<Trip, "id" | "createdAt">) => {
    const docRef = await addDoc(collection(db, "trips"), {
      ...trip,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  };

  const updateTrip = async (id: string, data: Partial<Trip>) => {
    await updateDoc(doc(db, "trips", id), data);
  };

  const deleteTrip = async (id: string) => {
    await deleteDoc(doc(db, "trips", id));
  };

  return { trips, loading, createTrip, updateTrip, deleteTrip };
}