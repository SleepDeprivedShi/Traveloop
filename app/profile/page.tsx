"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTrips, Trip } from "@/lib/useTrips";

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  city: string;
}

const mockPreplannedTrips: any[] = [];
const mockPreviousTrips: any[] = [];

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { trips, loading: tripsLoading } = useTrips(user || null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTrip, setIsEditingTrip] = useState<string | null>(null);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.displayName || "John Doe",
    phone: "+91 9876543210",
    email: user?.email || "john@example.com",
    city: "Mumbai",
  });
  
  const [editingProfile, setEditingProfile] = useState<UserProfile>(profile);

  const [tripForm, setTripForm] = useState({ name: "", startDate: "", endDate: "", description: "" });

  if (authLoading || tripsLoading) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please login to view your profile</p>
        </div>
      </div>
    );
  }

  const allTrips = [...mockPreplannedTrips, ...mockPreviousTrips];
  const preplannedTrips = allTrips.filter((trip: any) => new Date(trip.startDate) >= new Date());
  const previousTrips = allTrips.filter((trip: any) => new Date(trip.endDate) < new Date());

  const handleSaveProfile = () => {
    setProfile(editingProfile);
    setIsEditing(false);
  };

  const handleEditTrip = (trip: any) => {
    setTripForm({
      name: trip.name,
      startDate: trip.startDate,
      endDate: trip.endDate,
      description: trip.description || ""
    });
    setIsEditingTrip(trip.id);
  };

  const handleSaveTrip = () => {
    setIsEditingTrip(null);
    setTripForm({ name: "", startDate: "", endDate: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="bg-[#2E4057] text-white px-6 py-3">
        <span className="text-xl font-semibold text-[#FF6B35]">Traveloop</span>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Box */}
        <div className="bg-white rounded-3xl border border-gray-300 p-6 mb-6">
          <div className="flex items-start gap-6">
            {/* Left - User Image */}
            <div className="w-28 h-28 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-4xl text-gray-500">👤</span>
              )}
            </div>

            {/* Right - User Details */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <input
                      type="text"
                      value={editingProfile.name}
                      onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <input
                      type="text"
                      value={editingProfile.phone}
                      onChange={(e) => setEditingProfile({ ...editingProfile, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <input
                      type="email"
                      value={editingProfile.email}
                      onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">City</label>
                    <input
                      type="text"
                      value={editingProfile.city}
                      onChange={(e) => setEditingProfile({ ...editingProfile, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg text-sm hover:bg-[#e55a2b]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => { setIsEditing(false); setEditingProfile(profile); }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-xl font-semibold text-[#2E4057]">{profile.name}</h2>
                    <button
                      onClick={() => { setEditingProfile(profile); setIsEditing(true); }}
                      className="text-sm text-[#FF6B35] hover:underline font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <p>📱 {profile.phone}</p>
                    <p>📧 {profile.email}</p>
                    <p>🏙️ {profile.city}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preplanned Trips */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#2E4057] mb-4">Preplanned Trips</h3>
          {preplannedTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {preplannedTrips.map((trip: any) => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  isEditing={isEditingTrip === trip.id}
                  tripForm={tripForm}
                  setTripForm={setTripForm}
                  onEdit={() => handleEditTrip(trip)}
                  onSave={handleSaveTrip}
                  onCancel={() => setIsEditingTrip(null)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8 bg-white rounded-2xl border border-gray-300">No trips planned yet</p>
          )}
        </div>

        {/* Previous Trips */}
        <div>
          <h3 className="text-lg font-semibold text-[#2E4057] mb-4">Previous Trips</h3>
          {previousTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {previousTrips.map((trip: any) => (
                <TripCard 
                  key={trip.id} 
                  trip={trip}
                  isEditing={isEditingTrip === trip.id}
                  tripForm={tripForm}
                  setTripForm={setTripForm}
                  onEdit={() => handleEditTrip(trip)}
                  onSave={handleSaveTrip}
                  onCancel={() => setIsEditingTrip(null)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8 bg-white rounded-2xl border border-gray-300">No previous trips</p>
          )}
        </div>
      </div>
    </div>
  );
}

function TripCard({ trip, isEditing, tripForm, setTripForm, onEdit, onSave, onCancel }: any) {
  return (
    <div className="bg-white rounded-2xl border border-gray-300 p-4 hover:shadow-md transition-shadow">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={tripForm.name}
            onChange={(e) => setTripForm({ ...tripForm, name: e.target.value })}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            placeholder="Trip Name"
          />
          <input
            type="date"
            value={tripForm.startDate}
            onChange={(e) => setTripForm({ ...tripForm, startDate: e.target.value })}
            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
          />
          <input
            type="date"
            value={tripForm.endDate}
            onChange={(e) => setTripForm({ ...tripForm, endDate: e.target.value })}
            className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
          />
          <div className="flex gap-1">
            <button onClick={onSave} className="flex-1 py-1 bg-[#FF6B35] text-white rounded text-xs">Save</button>
            <button onClick={onCancel} className="flex-1 py-1 bg-gray-200 text-gray-700 rounded text-xs">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h4 className="font-semibold text-[#2E4057] mb-1">{trip.name}</h4>
          <p className="text-xs text-gray-500 mb-2">{trip.startDate} - {trip.endDate}</p>
          <p className="text-xs text-gray-400 mb-3">{trip.description}</p>
          <button
            onClick={onEdit}
            className="w-full py-2 bg-[#FF6B35] text-white rounded-xl text-xs font-medium hover:bg-[#e55a2b] transition-colors"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}