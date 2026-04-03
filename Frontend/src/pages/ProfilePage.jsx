// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { User, MapPin, Phone, Edit2, Check, X, Upload } from "lucide-react";

// const AVAILABLE_SKILLS = [
//   "Construction", "Painting", "Carpentry", "Electrical",
//   "Plumbing", "Loading/Unloading", "Warehouse", "Cleaning",
//   "Welding", "Masonry"
// ];

// export default function Profile() {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [avatarUploading, setAvatarUploading] = useState(false);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     location: "",
//     skills: [],
//     experience: "",
//     avatarUrl: ""
//   });

//   // helper: axios instance with auth
//   const api = axios.create({
//     http:'//localhost:3000',
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//       "Content-Type": "application/json"
//     }
//   });

//   useEffect(() => {
//     let mounted = true;
//     setLoading(true);
//     setError("");
//     api.get("/api/v1/users/me")
//       .then(res => {
//         if (!mounted) return;
//         const data = res.data;
//         setUser({
//           name: data.name || "",
//           email: data.email || "",
//           phone: data.phone || "",
//           location: data.location || "",
//           skills: data.skills || [],
//           experience: data.experience || "",
//           avatarUrl: data.avatarUrl || ""
//         });
//       })
//       .catch(err => {
//         console.error("Failed to fetch profile:", err);
//         setError(err?.response?.data?.message || "Unable to load profile.");
//         // optionally redirect to login if unauthorized
//         if (err?.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       })
//       .finally(() => mounted && setLoading(false));

//     return () => { mounted = false; };
//     // eslint-disable-next-line
//   }, []);

//   const toggleSkill = (skill) => {
//     setUser(prev => ({
//       ...prev,
//       skills: prev.skills.includes(skill)
//         ? prev.skills.filter(s => s !== skill)
//         : [...prev.skills, skill]
//     }));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setError("");
//     setSuccessMsg("");
//     try {
//       const payload = {
//         name: user.name,
//         phone: user.phone,
//         location: user.location,
//         skills: user.skills,
//         experience: user.experience
//       };
//       // PUT to update profile
//       const res = await api.put("/api/v1/users/me", payload);
//       setSuccessMsg("Profile updated successfully.");
//       // update avatarUrl if returned
//       if (res.data?.avatarUrl) setUser(prev => ({ ...prev, avatarUrl: res.data.avatarUrl }));
//     } catch (err) {
//       console.error("Update failed:", err);
//       setError(err?.response?.data?.message || "Failed to update profile.");
//     } finally {
//       setSaving(false);
//       setTimeout(() => setSuccessMsg(""), 2500);
//     }
//   };

//   const handleAvatarPick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleAvatarChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setAvatarUploading(true);
//     setError("");
//     try {
//       const form = new FormData();
//       form.append("avatar", file);
//       // Example endpoint expects multipart/form-data
//       const res = await api.post("/api/v1/users/me/avatar", form, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       setUser(prev => ({ ...prev, avatarUrl: res.data.avatarUrl || prev.avatarUrl }));
//       setSuccessMsg("Avatar uploaded");
//       setTimeout(() => setSuccessMsg(""), 2000);
//     } catch (err) {
//       console.error("Avatar upload error:", err);
//       setError(err?.response?.data?.message || "Avatar upload failed.");
//     } finally {
//       setAvatarUploading(false);
//       // reset file input so same file can be re-selected later
//       e.target.value = "";
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   if (loading) {
//     return (
//       <main className="min-h-screen flex items-center justify-center p-6">
//         <div className="text-gray-500">Loading profile...</div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-3xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-semibold">My Profile</h1>
//           <div className="flex items-center gap-3">
//             <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6 space-y-6">
//           {/* Avatar / basic */}
//           <div className="flex items-center gap-6">
//             <div className="relative">
//               <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-gray-400">
//                 {user.avatarUrl ? (
//                   <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
//                 ) : (
//                   <User className="w-10 h-10" />
//                 )}
//               </div>

//               <div className="absolute right-0 bottom-0">
//                 <button
//                   onClick={handleAvatarPick}
//                   className="bg-primary/10 text-primary p-2 rounded-full hover:bg-primary/20 border border-primary/20"
//                   title="Upload avatar"
//                 >
//                   <Upload className="w-4 h-4" />
//                 </button>
//                 <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
//               </div>
//             </div>

//             <div>
//               <h2 className="text-lg font-medium">{user.name || "Your Name"}</h2>
//               <p className="text-sm text-gray-500">{user.email || "No email"}</p>
//               <p className="text-sm text-gray-500 mt-2"><MapPin className="inline w-4 h-4 mr-1" /> {user.location || "Not set"}</p>
//             </div>
//           </div>

//           <form onSubmit={handleSave} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Full name</label>
//               <input
//                 type="text"
//                 value={user.name}
//                 onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
//                 className="input input-bordered w-full"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email (read-only)</label>
//               <input type="email" value={user.email} className="input input-bordered w-full bg-gray-100" readOnly />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Phone</label>
//               <div className="flex gap-2">
//                 <input
//                   type="tel"
//                   value={user.phone}
//                   onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
//                   className="input input-bordered flex-1"
//                 />
//                 <button type="button" className="btn btn-outline" onClick={() => alert("Trigger phone verification flow")}>
//                   Verify
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Location</label>
//               <input
//                 type="text"
//                 value={user.location}
//                 onChange={(e) => setUser(prev => ({ ...prev, location: e.target.value }))}
//                 className="input input-bordered w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
//               <div className="flex flex-wrap gap-2">
//                 {AVAILABLE_SKILLS.map(skill => (
//                   <button
//                     key={skill}
//                     type="button"
//                     onClick={() => toggleSkill(skill)}
//                     className={`px-3 py-1 rounded-full text-sm border transition ${
//                       user.skills.includes(skill) ? "bg-primary/10 border-primary text-primary" : "bg-white border-gray-200 hover:border-gray-300"
//                     }`}
//                   >
//                     {skill}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Experience</label>
//               <select
//                 value={user.experience}
//                 onChange={(e) => setUser(prev => ({ ...prev, experience: e.target.value }))}
//                 className="input input-bordered w-48"
//               >
//                 <option value="">Select</option>
//                 <option value="0-1">Less than 1 year</option>
//                 <option value="1-3">1 - 3 years</option>
//                 <option value="3-5">3 - 5 years</option>
//                 <option value="5+">5+ years</option>
//               </select>
//             </div>

//             {error && <p className="text-sm text-red-600">{error}</p>}
//             {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}

//             <div className="flex items-center gap-3">
//               <button type="submit" className="btn btn-primary" disabled={saving}>
//                 {saving ? "Saving..." : <><Check className="w-4 h-4 mr-2" /> Save Changes</>}
//               </button>
//               <button type="button" onClick={() => { /* reset to last fetched or clear */ window.location.reload(); }} className="btn btn-ghost">
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Account actions */}
//         <div className="mt-6 flex gap-3">
//           <button onClick={() => navigate("/applications")} className="btn btn-outline">
//             My Applications
//           </button>
//           <button onClick={() => navigate("/disputes")} className="btn btn-outline">
//             My Disputes
//           </button>
//           <button onClick={handleLogout} className="btn btn-error ml-auto">
//             Logout
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }





// import React, { useEffect, useMemo, useRef, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   User,
//   MapPin,
//   Phone,
//   Edit2,
//   Check,
//   X,
//   Upload,
//   Star,
//   ShieldCheck,
//   AlertCircle
// } from "lucide-react";

// /**
//  * Profile.jsx
//  * - Shows registration fields aligned with your Mongoose model
//  * - Edit mode to update profile (firstName, contact, aadhar, role (readonly), skills, location coords)
//  * - Avatar upload (multipart)
//  * - Use current location (sets GeoJSON Point coordinates [lng, lat])
//  *
//  * Adjust API endpoints to your server routes as needed.
//  */

// const AVAILABLE_SKILLS = [
//   "Construction",
//   "Painting",
//   "Carpentry",
//   "Electrical",
//   "Plumbing",
//   "Loading/Unloading",
//   "Warehouse",
//   "Cleaning",
//   "Welding",
//   "Masonry"
// ];

// export default function Profile() {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [avatarUploading, setAvatarUploading] = useState(false);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   // Local shape aligned to your mongoose model
//   const [user, setUser] = useState({
//     _id: "",
//     firstName: "",
//     contact: "", // number as string
//     emailId: "",
//     aadhar: "",
//     role: "laborer", // laborer|employer|mediator|admin
//     skills: [],
//     verified: false,
//     rating: 0,
//     ratingCount: 0,
//     isBlocked: false,
//     location: { type: "Point", coordinates: [0, 0] }, // [lng, lat]
//     avatarUrl: ""
//   });

//   // memoized axios instance (so eslint won't complain about re-creation)
//   const api = useMemo(() => {
//     const token = localStorage.getItem("token") || "";
//     return axios.create({
//       baseURL: "http://localhost:3000", // change if needed
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       timeout: 10000
//     });
//   }, []);

//   useEffect(() => {
//     let mounted = true;
//     setLoading(true);
//     setError("");
//     api
//       .get("/api/v1/users/me") // adapt if required
//       .then((res) => {
//         if (!mounted) return;
//         const d = res.data || {};
//         // normalize response -> our local user shape
//         setUser((prev) => ({
//           ...prev,
//           _id: d._id || d.id || prev._id,
//           firstName: d.firstName || d.firstName || d.name || "",
//           contact: d.contact ? String(d.contact) : d.contact || "",
//           emailId: d.emailId || d.email || "",
//           aadhar: d.aadhar ? String(d.aadhar) : d.aadhar || "",
//           role: d.role || prev.role,
//           skills: Array.isArray(d.skills) ? d.skills : prev.skills,
//           verified: Boolean(d.verified),
//           rating: typeof d.rating === "number" ? d.rating : prev.rating,
//           ratingCount: typeof d.ratingCount === "number" ? d.ratingCount : prev.ratingCount,
//           isBlocked: Boolean(d.isBlocked),
//           location:
//             d.location && Array.isArray(d.location.coordinates)
//               ? { type: "Point", coordinates: d.location.coordinates }
//               : prev.location,
//           avatarUrl: d.avatarUrl || d.avatar || prev.avatarUrl
//         }));
//       })
//       .catch((err) => {
//         console.error("Failed to fetch profile:", err);
//         setError(err?.response?.data?.message || "Unable to load profile.");
//         if (err?.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       })
//       .finally(() => mounted && setLoading(false));

//     return () => {
//       mounted = false;
//     };
//     // note: api is stable (useMemo) so it's safe to omit from deps here
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const toggleSkill = (skill) => {
//     setUser((prev) => ({
//       ...prev,
//       skills: prev.skills.includes(skill)
//         ? prev.skills.filter((s) => s !== skill)
//         : [...prev.skills, skill]
//     }));
//   };

//   const handleAvatarPick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleAvatarChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setAvatarUploading(true);
//     setError("");
//     try {
//       const form = new FormData();
//       form.append("avatar", file);
//       const res = await api.post("/api/v1/users/me/avatar", form, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       setUser((prev) => ({ ...prev, avatarUrl: res.data.avatarUrl || prev.avatarUrl }));
//       setSuccessMsg("Avatar uploaded");
//       setTimeout(() => setSuccessMsg(""), 2500);
//     } catch (err) {
//       console.error("Avatar upload error:", err);
//       setError(err?.response?.data?.message || "Avatar upload failed.");
//     } finally {
//       setAvatarUploading(false);
//       e.target.value = "";
//     }
//   };

//   const handleUseCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported in this browser.");
//       return;
//     }
//     setError("");
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { longitude, latitude } = pos.coords;
//         setUser((prev) => ({
//           ...prev,
//           location: { type: "Point", coordinates: [longitude, latitude] }
//         }));
//         setSuccessMsg("Location set from device.");
//         setTimeout(() => setSuccessMsg(""), 2500);
//       },
//       (err) => {
//         console.error("Geo error:", err);
//         setError("Unable to get location. Please allow location access.");
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   };

//   const handleSave = async (e) => {
//     e?.preventDefault?.();
//     setSaving(true);
//     setError("");
//     try {
//       // Construct payload that matches mongoose model
//       const payload = {
//         firstName: user.firstName,
//         contact: Number(user.contact) || user.contact,
//         // emailId typically immutable - we won't send it unless you support edit
//         aadhar: user.aadhar ? Number(user.aadhar) : undefined,
//         // role should usually be readonly for normal users - send only if allowed
//         skills: user.skills,
//         location: user.location
//       };

//       // Remove undefined keys
//       Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

//       const res = await api.put("/api/v1/users/me", payload);
//       // update returned data if any
//       const d = res.data || {};
//       setUser((prev) => ({
//         ...prev,
//         ...("firstName" in d ? { firstName: d.firstName } : {}),
//         ...("contact" in d ? { contact: String(d.contact) } : {}),
//         ...("aadhar" in d ? { aadhar: String(d.aadhar) } : {}),
//         ...("skills" in d ? { skills: d.skills } : {}),
//         ...("location" in d && d.location?.coordinates ? { location: d.location } : {})
//       }));
//       setSuccessMsg("Profile updated successfully.");
//       setEditing(false);
//       setTimeout(() => setSuccessMsg(""), 2700);
//     } catch (err) {
//       console.error("Update failed:", err);
//       setError(err?.response?.data?.message || "Failed to update profile.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   if (loading) {
//     return (
//       <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
//         <div className="text-gray-500">Loading profile...</div>
//       </main>
//     );
//   }

//   const { firstName, contact, emailId, aadhar, role, skills, verified, rating, ratingCount, isBlocked, location, avatarUrl } = user;

//   return (
//     <main className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-2xl font-semibold">My Profile</h1>
//             <p className="text-sm text-gray-600">Manage your KaamSetu account details</p>
//           </div>

//           <div className="flex items-center gap-3">
//             {verified ? (
//               <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm">
//                 <ShieldCheck className="w-4 h-4" /> Verified
//               </div>
//             ) : (
//               <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-sm">
//                 <AlertCircle className="w-4 h-4" /> Not Verified
//               </div>
//             )}

//             <button
//               onClick={() => {
//                 setEditing((v) => !v);
//                 setError("");
//                 setSuccessMsg("");
//               }}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border hover:bg-gray-50"
//               aria-pressed={editing}
//             >
//               <Edit2 className="w-4 h-4" />
//               <span className="text-sm font-medium">{editing ? "Editing" : "Edit Profile"}</span>
//             </button>

//             <button onClick={handleLogout} className="ml-2 px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
//               Logout
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           {/* Top row: avatar + main info */}
//           <div className="flex flex-col sm:flex-row gap-6">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-gray-400">
//                   {avatarUrl ? (
//                     // avoid breaking if url is empty
//                     <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
//                   ) : (
//                     <User className="w-10 h-10" />
//                   )}
//                 </div>

//                 <div className="absolute right-0 bottom-0">
//                   <button
//                     onClick={handleAvatarPick}
//                     className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 border-2 border-white shadow"
//                     title="Upload avatar"
//                   >
//                     <Upload className="w-4 h-4" />
//                   </button>
//                   <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-lg font-semibold">{firstName || "Your name"}</h2>
//                 <div className="text-sm text-gray-500">{emailId || "No email"}</div>

//                 <div className="mt-3 flex items-center gap-3">
//                   <div className="flex items-center gap-2 text-sm text-gray-700">
//                     <Star className="w-4 h-4 text-yellow-400" />
//                     <span className="font-medium">{rating?.toFixed?.(1) ?? 0}</span>
//                     <span className="text-xs text-gray-500">({ratingCount ?? 0} reviews)</span>
//                   </div>

//                   <div className="flex items-center gap-2 text-sm text-gray-700 ml-4">
//                     <MapPin className="w-4 h-4" />
//                     <span>
//                       {location?.coordinates && location.coordinates[0] !== 0
//                         ? `Lon ${location.coordinates[0].toFixed(4)}, Lat ${location.coordinates[1].toFixed(4)}`
//                         : "Location not set"}
//                     </span>
//                   </div>

//                   <div className={`ml-4 px-2 py-1 rounded-full text-xs ${isBlocked ? "bg-red-100 text-red-700" : "bg-green-50 text-green-700"}`}>
//                     {isBlocked ? "Blocked" : role?.toUpperCase() ?? "ROLE"}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* right column: quick stats */}
//             <div className="ml-auto flex gap-4 items-center">
//               <div className="text-center">
//                 <div className="text-sm text-gray-500">Jobs Applied</div>
//                 <div className="text-lg font-semibold">—</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-sm text-gray-500">Active Cases</div>
//                 <div className="text-lg font-semibold">{user.activeCases ?? 0}</div>
//               </div>
//             </div>
//           </div>

//           <hr className="my-6" />

//           {/* Profile form / display */}
//           {!editing ? (
//             // READ-ONLY VIEW
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <div className="text-xs text-gray-500">Full name</div>
//                 <div className="font-medium">{firstName || "-"}</div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500">Contact</div>
//                 <div className="font-medium">{contact || "-"}</div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500">Aadhar</div>
//                 <div className="font-medium">{aadhar || "-"}</div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500">Role</div>
//                 <div className="font-medium">{role}</div>
//               </div>

//               <div className="md:col-span-2">
//                 <div className="text-xs text-gray-500">Skills</div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {skills && skills.length ? (
//                     skills.map((s) => (
//                       <span key={s} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
//                         {s}
//                       </span>
//                     ))
//                   ) : (
//                     <div className="text-sm text-gray-500">No skills added</div>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500">Verified</div>
//                 <div className="font-medium">{verified ? "Yes" : "No"}</div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500">Account status</div>
//                 <div className="font-medium">{isBlocked ? "Blocked" : "Active"}</div>
//               </div>
//             </div>
//           ) : (
//             // EDIT MODE
//             <form onSubmit={handleSave} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Full name</label>
//                   <input
//                     type="text"
//                     value={user.firstName}
//                     onChange={(e) => setUser((p) => ({ ...p, firstName: e.target.value }))}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Contact</label>
//                   <input
//                     type="tel"
//                     value={user.contact}
//                     onChange={(e) => setUser((p) => ({ ...p, contact: e.target.value }))}
//                     className="w-full px-3 py-2 border rounded"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Aadhar (optional)</label>
//                   <input
//                     type="text"
//                     value={user.aadhar || ""}
//                     onChange={(e) => setUser((p) => ({ ...p, aadhar: e.target.value }))}
//                     className="w-full px-3 py-2 border rounded"
//                     maxLength={12}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Role</label>
//                   <input type="text" value={user.role} readOnly className="w-full px-3 py-2 border rounded bg-gray-100" />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700">Skills</label>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {AVAILABLE_SKILLS.map((skill) => (
//                       <button
//                         key={skill}
//                         type="button"
//                         onClick={() => toggleSkill(skill)}
//                         className={`px-3 py-1 rounded-full text-sm border transition ${
//                           skills.includes(skill) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white border-gray-200 hover:border-gray-300"
//                         }`}
//                       >
//                         {skill}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Location (coordinates)</label>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={
//                         user.location?.coordinates ? `${user.location.coordinates[0]}, ${user.location.coordinates[1]}` : ""
//                       }
//                       onChange={(e) => {
//                         // allow manual comma-separated input "lng, lat"
//                         const raw = e.target.value;
//                         const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
//                         if (parts.length === 2) {
//                           const lng = Number(parts[0]);
//                           const lat = Number(parts[1]);
//                           if (!isNaN(lng) && !isNaN(lat)) {
//                             setUser((p) => ({ ...p, location: { type: "Point", coordinates: [lng, lat] } }));
//                           }
//                         } else {
//                           // don't update until valid
//                           setUser((p) => ({ ...p, location: p.location }));
//                         }
//                       }}
//                       placeholder="lng, lat"
//                       className="flex-1 px-3 py-2 border rounded"
//                     />
//                     <button type="button" onClick={handleUseCurrentLocation} className="px-3 py-2 bg-gray-100 rounded border">
//                       Use my location
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {error && <div className="text-sm text-red-600">{error}</div>}
//               {successMsg && <div className="text-sm text-green-600">{successMsg}</div>}

//               <div className="flex items-center gap-3">
//                 <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={saving}>
//                   {saving ? "Saving..." : <span className="inline-flex items-center gap-2"><Check className="w-4 h-4" /> Save</span>}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     // revert changes by re-fetching profile (simple approach)
//                     setEditing(false);
//                     setLoading(true);
//                     api.get("/api/v1/users/me").then((res) => {
//                       const d = res.data || {};
//                       setUser((prev) => ({
//                         ...prev,
//                         firstName: d.firstName || prev.firstName,
//                         contact: d.contact ? String(d.contact) : prev.contact,
//                         emailId: d.emailId || prev.emailId,
//                         aadhar: d.aadhar ? String(d.aadhar) : prev.aadhar,
//                         role: d.role || prev.role,
//                         skills: Array.isArray(d.skills) ? d.skills : prev.skills,
//                         location: d.location && Array.isArray(d.location.coordinates) ? { type: "Point", coordinates: d.location.coordinates } : prev.location,
//                         avatarUrl: d.avatarUrl || prev.avatarUrl
//                       }));
//                     }).catch(() => {}).finally(() => setLoading(false));
//                   }}
//                   className="px-4 py-2 border rounded"
//                 >
//                   <X className="w-4 h-4 inline mr-1" /> Cancel
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>

//         {/* footer actions */}
//         <div className="mt-6 flex gap-3">
//           <button onClick={() => navigate("/applications")} className="px-4 py-2 border rounded">
//             My Applications
//           </button>
//           <button onClick={() => navigate("/disputes")} className="px-4 py-2 border rounded">
//             My Disputes
//           </button>
//           <div className="ml-auto text-sm text-gray-500">Member since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</div>
//         </div>
//       </div>
//     </main>
//   );
// }











// import React, { useEffect, useMemo, useRef, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { User, MapPin, Phone, Edit2, Check, X, Upload, Star, ShieldCheck, AlertCircle, LogOut, Briefcase, FileText } from "lucide-react";

// const AVAILABLE_SKILLS = [
//   "Construction",
//   "Painting",
//   "Carpentry",
//   "Electrical",
//   "Plumbing",
//   "Loading/Unloading",
//   "Warehouse",
//   "Cleaning",
//   "Welding",
//   "Masonry"
// ];

// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [avatarUploading, setAvatarUploading] = useState(false);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const [user, setUser] = useState({
//     _id: "",
//     firstName: "",
//     contact: "",
//     emailId: "",
//     aadhar: "",
//     role: "laborer",
//     skills: [],
//     verified: false,
//     rating: 0,
//     ratingCount: 0,
//     isBlocked: false,
//     location: { type: "Point", coordinates: [0, 0] },
//     avatarUrl: ""
//   });

//   const api = useMemo(() => {
//     const token = localStorage.getItem("token") || "";
//     return axios.create({
//       baseURL: "http://localhost:3000",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       timeout: 10000
//     });
//   }, []);

//   useEffect(() => {
//     let mounted = true;
//     setLoading(true);
//     setError("");
//     api
//       .get("/api/v1/users/me")
//       .then((res) => {
//         if (!mounted) return;
//         const d = res.data || {};
//         setUser((prev) => ({
//           ...prev,
//           _id: d._id || d.id || prev._id,
//           firstName: d.firstName || d.name || "",
//           contact: d.contact ? String(d.contact) : "",
//           emailId: d.emailId || d.email || "",
//           aadhar: d.aadhar ? String(d.aadhar) : "",
//           role: d.role || prev.role,
//           skills: Array.isArray(d.skills) ? d.skills : prev.skills,
//           verified: Boolean(d.verified),
//           rating: typeof d.rating === "number" ? d.rating : prev.rating,
//           ratingCount: typeof d.ratingCount === "number" ? d.ratingCount : prev.ratingCount,
//           isBlocked: Boolean(d.isBlocked),
//           location:
//             d.location && Array.isArray(d.location.coordinates)
//               ? { type: "Point", coordinates: d.location.coordinates }
//               : prev.location,
//           avatarUrl: d.avatarUrl || d.avatar || prev.avatarUrl
//         }));
//       })
//       .catch((err) => {
//         console.error("Failed to fetch profile:", err);
//         setError(err?.response?.data?.message || "Unable to load profile.");
//         if (err?.response?.status === 401) {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }
//       })
//       .finally(() => mounted && setLoading(false));

//     return () => {
//       mounted = false;
//     };
//   }, [api, navigate]);

//   const toggleSkill = (skill) => {
//     setUser((prev) => ({
//       ...prev,
//       skills: prev.skills.includes(skill)
//         ? prev.skills.filter((s) => s !== skill)
//         : [...prev.skills, skill]
//     }));
//   };

//   const handleAvatarPick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleAvatarChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setAvatarUploading(true);
//     setError("");
//     try {
//       const form = new FormData();
//       form.append("avatar", file);
//       const res = await api.post("/api/v1/users/me/avatar", form, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       setUser((prev) => ({ ...prev, avatarUrl: res.data.avatarUrl || prev.avatarUrl }));
//       setSuccessMsg("Avatar uploaded");
//       setTimeout(() => setSuccessMsg(""), 2500);
//     } catch (err) {
//       console.error("Avatar upload error:", err);
//       setError(err?.response?.data?.message || "Avatar upload failed.");
//     } finally {
//       setAvatarUploading(false);
//       e.target.value = "";
//     }
//   };

//   const handleUseCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported in this browser.");
//       return;
//     }
//     setError("");
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { longitude, latitude } = pos.coords;
//         setUser((prev) => ({
//           ...prev,
//           location: { type: "Point", coordinates: [longitude, latitude] }
//         }));
//         setSuccessMsg("Location set from device.");
//         setTimeout(() => setSuccessMsg(""), 2500);
//       },
//       (err) => {
//         console.error("Geo error:", err);
//         setError("Unable to get location. Please allow location access.");
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   };

//   const handleSave = async (e) => {
//     e?.preventDefault?.();
//     setSaving(true);
//     setError("");
//     try {
//       const payload = {
//         firstName: user.firstName,
//         contact: Number(user.contact) || user.contact,
//         aadhar: user.aadhar ? Number(user.aadhar) : undefined,
//         skills: user.skills,
//         location: user.location
//       };

//       Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

//       const res = await api.put("/api/v1/users/me", payload);
//       const d = res.data || {};
//       setUser((prev) => ({
//         ...prev,
//         ...("firstName" in d ? { firstName: d.firstName } : {}),
//         ...("contact" in d ? { contact: String(d.contact) } : {}),
//         ...("aadhar" in d ? { aadhar: String(d.aadhar) } : {}),
//         ...("skills" in d ? { skills: d.skills } : {}),
//         ...("location" in d && d.location?.coordinates ? { location: d.location } : {})
//       }));
//       setSuccessMsg("Profile updated successfully.");
//       setEditing(false);
//       setTimeout(() => setSuccessMsg(""), 2700);
//     } catch (err) {
//       console.error("Update failed:", err);
//       setError(err?.response?.data?.message || "Failed to update profile.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   if (loading) {
//     return (
//       <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-50">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
//           <div className="text-slate-600 font-semibold">Loading profile...</div>
//         </div>
//       </main>
//     );
//   }

//   const { firstName, contact, emailId, aadhar, role, skills, verified, rating, ratingCount, isBlocked, location, avatarUrl } = user;

//   return (
//     <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
//       {/* Background decoration */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-5" />
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-5" />
//       </div>

//       <div className="relative max-w-6xl mx-auto px-4 py-12">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
//           <div>
//             <h1 className="text-4xl font-black bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
//               My Profile
//             </h1>
//             <p className="text-slate-600 font-medium">Manage your KaamSetu account details</p>
//           </div>

//           <div className="flex flex-wrap items-center gap-3">
//             {verified ? (
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 font-bold">
//                 <ShieldCheck className="w-4 h-4" /> Verified
//               </div>
//             ) : (
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-amber-100 to-orange-100 text-amber-700 font-bold">
//                 <AlertCircle className="w-4 h-4" /> Not Verified
//               </div>
//             )}

//             <button
//               onClick={() => {
//                 setEditing((v) => !v);
//                 setError("");
//                 setSuccessMsg("");
//               }}
//               className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
//                 editing
//                   ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
//                   : "border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               <Edit2 className="w-4 h-4" />
//               <span>{editing ? "Editing" : "Edit Profile"}</span>
//             </button>

//             <button
//               onClick={handleLogout}
//               className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-rose-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-600 transition-all"
//             >
//               <LogOut className="w-4 h-4" /> Logout
//             </button>
//           </div>
//         </div>

//         {/* Main Profile Card */}
//         <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
//           {/* Avatar Section */}
//           <div className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8">
//             <div className="flex flex-col md:flex-row gap-6 items-start">
//               <div className="relative">
//                 <div className="w-32 h-32 rounded-3xl overflow-hidden bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl border-4 border-white/30">
//                   {avatarUrl ? (
//                     <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
//                   ) : (
//                     <User className="w-16 h-16 text-white/70" />
//                   )}
//                 </div>

//                 <button
//                   onClick={handleAvatarPick}
//                   className="absolute -bottom-2 -right-2 bg-white text-emerald-600 p-3 rounded-2xl hover:bg-emerald-50 shadow-lg transition-all border-2 border-white"
//                   title="Upload avatar"
//                   disabled={avatarUploading}
//                 >
//                   {avatarUploading ? (
//                     <div className="w-5 h-5 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin" />
//                   ) : (
//                     <Upload className="w-5 h-5" />
//                   )}
//                 </button>
//                 <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
//               </div>

//               <div className="flex-1 text-white">
//                 <h2 className="text-3xl font-black mb-2">{firstName || "Your name"}</h2>
//                 <div className="text-emerald-100 font-medium mb-4">{emailId || "No email"}</div>

//                 <div className="flex flex-wrap gap-4">
//                   <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm">
//                     <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
//                     <span className="font-bold">{rating?.toFixed?.(1) ?? 0}</span>
//                     <span className="text-sm text-white/80">({ratingCount ?? 0})</span>
//                   </div>

//                   <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm">
//                     <MapPin className="w-5 h-5" />
//                     <span className="text-sm font-semibold">
//                       {location?.coordinates && location.coordinates[0] !== 0
//                         ? `${location.coordinates[0].toFixed(2)}, ${location.coordinates[1].toFixed(2)}`
//                         : "No location"}
//                     </span>
//                   </div>

//                   <div className={`px-4 py-2 rounded-xl font-bold uppercase text-sm ${
//                     isBlocked ? "bg-rose-500" : "bg-white/20 backdrop-blur-sm"
//                   }`}>
//                     {isBlocked ? "Blocked" : role}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-6">
//                 <div className="text-center">
//                   <div className="text-3xl font-black text-white mb-1">—</div>
//                   <div className="text-xs text-emerald-100 font-semibold uppercase tracking-wider">Jobs Applied</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-black text-white mb-1">{user.activeCases ?? 0}</div>
//                   <div className="text-xs text-emerald-100 font-semibold uppercase tracking-wider">Active Cases</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="p-8">
//             {error && (
//               <div className="mb-6 p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-700 font-semibold flex items-center gap-2">
//                 <AlertCircle className="w-5 h-5" />
//                 {error}
//               </div>
//             )}

//             {successMsg && (
//               <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-700 font-semibold flex items-center gap-2">
//                 <ShieldCheck className="w-5 h-5" />
//                 {successMsg}
//               </div>
//             )}

//             {!editing ? (
//               // READ-ONLY VIEW
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <InfoItem label="Full name" value={firstName || "-"} />
//                 <InfoItem label="Contact" value={contact || "-"} icon={<Phone className="w-4 h-4" />} />
//                 <InfoItem label="Aadhar" value={aadhar || "-"} />
//                 <InfoItem label="Role" value={role} />
//                 <InfoItem label="Verified" value={verified ? "Yes" : "No"} />
//                 <InfoItem label="Account status" value={isBlocked ? "Blocked" : "Active"} />

//                 <div className="md:col-span-2">
//                   <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Skills</div>
//                   <div className="flex flex-wrap gap-2">
//                     {skills && skills.length ? (
//                       skills.map((s) => (
//                         <span key={s} className="px-4 py-2 bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-bold">
//                           {s}
//                         </span>
//                       ))
//                     ) : (
//                       <div className="text-sm text-slate-500">No skills added</div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               // EDIT MODE
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-bold text-slate-900 mb-2">Full name</label>
//                     <input
//                       type="text"
//                       value={user.firstName}
//                       onChange={(e) => setUser((p) => ({ ...p, firstName: e.target.value }))}
//                       className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-bold text-slate-900 mb-2">Contact</label>
//                     <input
//                       type="tel"
//                       value={user.contact}
//                       onChange={(e) => setUser((p) => ({ ...p, contact: e.target.value }))}
//                       className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-bold text-slate-900 mb-2">Aadhar (optional)</label>
//                     <input
//                       type="text"
//                       value={user.aadhar || ""}
//                       onChange={(e) => setUser((p) => ({ ...p, aadhar: e.target.value }))}
//                       className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
//                       maxLength={12}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-bold text-slate-900 mb-2">Role</label>
//                     <input
//                       type="text"
//                       value={user.role}
//                       readOnly
//                       className="w-full px-4 py-3 rounded-2xl bg-slate-100 border-2 border-slate-200 font-medium text-slate-500"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-slate-900 mb-3">Skills</label>
//                   <div className="flex flex-wrap gap-2">
//                     {AVAILABLE_SKILLS.map((skill) => (
//                       <button
//                         key={skill}
//                         type="button"
//                         onClick={() => toggleSkill(skill)}
//                         className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
//                           skills.includes(skill)
//                             ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
//                             : "bg-white border-2 border-slate-300 text-slate-700 hover:border-emerald-400"
//                         }`}
//                       >
//                         {skill}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-slate-900 mb-2">Location (coordinates)</label>
//                   <div className="flex gap-3">
//                     <input
//                       type="text"
//                       value={
//                         user.location?.coordinates ? `${user.location.coordinates[0]}, ${user.location.coordinates[1]}` : ""
//                       }
//                       onChange={(e) => {
//                         const raw = e.target.value;
//                         const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
//                         if (parts.length === 2) {
//                           const lng = Number(parts[0]);
//                           const lat = Number(parts[1]);
//                           if (!isNaN(lng) && !isNaN(lat)) {
//                             setUser((p) => ({ ...p, location: { type: "Point", coordinates: [lng, lat] } }));
//                           }
//                         }
//                       }}
//                       placeholder="lng, lat"
//                       className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleUseCurrentLocation}
//                       className="px-6 py-3 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all whitespace-nowrap"
//                     >
//                       Use my location
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 pt-4">
//                   <button
//                     onClick={handleSave}
//                     className="px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center gap-2"
//                     disabled={saving}
//                   >
//                     {saving ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <Check className="w-5 h-5" /> Save Changes
//                       </>
//                     )}
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => setEditing(false)}
//                     className="px-8 py-4 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
//                   >
//                     <X className="w-5 h-5" /> Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => navigate("/applications")}
//               className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all"
//             >
//               <Briefcase className="w-4 h-4" /> My Applications
//             </button>
//             <button
//               onClick={() => navigate("/disputes")}
//               className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all"
//             >
//               <FileText className="w-4 h-4" /> My Disputes
//             </button>
//           </div>

//           <div className="text-sm text-slate-500 font-medium">
//             Member since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// function InfoItem({ label, value, icon }) {
//   return (
//     <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
//       <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
//         {icon}
//         {label}
//       </div>
//       <div className="font-bold text-slate-900">{value}</div>
//     </div>
//   );
// }







import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Phone, Edit2, Check, X, Upload, Star, ShieldCheck, AlertCircle, LogOut, Briefcase, FileText } from "lucide-react";
import axiosClient from "../API/axiosClient";
import { useSelector } from "react-redux";




const AVAILABLE_SKILLS = [
  "Construction",
  "Painting",
  "Carpentry",
  "Electrical",
  "Plumbing",
  "Loading/Unloading",
  "Warehouse",
  "Cleaning",
  "Welding",
  "Masonry"
];

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { user } = useSelector(state => state.auth);

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [profile, setProfile] = useState(() => ({
    _id: user?._id || "",
    firstName: user?.firstName || "",
    contact: user?.contact ? String(user.contact) : "",
    emailId: user?.emailId || "",
    aadhar: user?.aadhar ? String(user.aadhar) : "",
    role: user?.role || "",
    skills: Array.isArray(user?.skills) ? user.skills : [],
    verified: Boolean(user?.verified ?? user?.isVerified),
    rating: user?.rating ?? 0,
    ratingCount: user?.ratingCount ?? 0,
    isBlocked: Boolean(user?.isBlocked),
    location: user?.location || { type: "Point", coordinates: [0, 0] },
    avatarUrl: user?.avatarUrl || "",
    activeCases: user?.activeCases ?? 0,
    createdAt: user?.createdAt || null
  }));

  useEffect(() => {
    setProfile(prev => ({
      ...prev,
      _id: user?._id || "",
      firstName: user?.firstName || "",
      contact: user?.contact ? String(user.contact) : "",
      emailId: user?.emailId || "",
      aadhar: user?.aadhar ? String(user.aadhar) : "",
      role: user?.role || "",
      skills: Array.isArray(user?.skills) ? user.skills : [],
      verified: Boolean(user?.verified ?? user?.isVerified),
      rating: user?.rating ?? prev.rating ?? 0,
      ratingCount: user?.ratingCount ?? prev.ratingCount ?? 0,
      isBlocked: Boolean(user?.isBlocked),
      location: user?.location || prev.location || { type: "Point", coordinates: [0, 0] },
      avatarUrl: user?.avatarUrl || prev.avatarUrl || "",
      activeCases: user?.activeCases ?? prev.activeCases ?? 0,
      createdAt: user?.createdAt || prev.createdAt || null
    }));
  }, [user]);

  

  

  const toggleSkill = (skill) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleAvatarPick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("avatar", file);
      const { data } = await axiosClient.post("/user/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setProfile(prev => ({ ...prev, avatarUrl: data?.avatarUrl || prev.avatarUrl }));
      setSuccessMsg("Avatar uploaded");
      setTimeout(() => setSuccessMsg(""), 2500);
    } catch (err) {
      console.error("Avatar upload error:", err);
      setError(err?.response?.data?.message || "Avatar upload failed.");
    } finally {
      setAvatarUploading(false);
      e.target.value = "";
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported in this browser.");
      return;
    }
    setError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { longitude, latitude } = pos.coords;
        setProfile((prev) => ({
          ...prev,
          location: { type: "Point", coordinates: [longitude, latitude] }
        }));
        setSuccessMsg("Location set from device.");
        setTimeout(() => setSuccessMsg(""), 2500);
      },
      (err) => {
        console.error("Geo error:", err);
        setError("Unable to get location. Please allow location access.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSave = async (e) => {
    e?.preventDefault?.();
    setSaving(true);
    setError("");

    const trimmedName = profile.firstName?.trim() || "";
    const contactValue = profile.contact?.toString().trim();
    const aadharValue = profile.aadhar?.toString().trim();

    const payload = {
      firstName: trimmedName,
      contact: contactValue || undefined,
      aadhar: aadharValue || undefined,
      skills: profile.skills,
      location: profile.location
    };

    Object.keys(payload).forEach((key) => {
      if (
        payload[key] === undefined ||
        payload[key] === null ||
        (typeof payload[key] === "string" && payload[key].trim() === "")
      ) {
        delete payload[key];
      }
    });

    try {
      const { data } = await axiosClient.patch('/user/update', payload);
      const updated = data?.data || data?.user || {};
      setProfile(prev => ({
        ...prev,
        ...payload,
        ...(
          updated && typeof updated === "object"
            ? {
                firstName: updated.firstName ?? prev.firstName,
                contact: updated.contact !== undefined ? String(updated.contact) : prev.contact,
                aadhar: updated.aadhar !== undefined ? String(updated.aadhar) : prev.aadhar,
                skills: Array.isArray(updated.skills) ? updated.skills : prev.skills,
                location: updated.location || prev.location,
                verified: updated.verified ?? prev.verified,
                rating: updated.rating ?? prev.rating,
                ratingCount: updated.ratingCount ?? prev.ratingCount,
                isBlocked: updated.isBlocked ?? prev.isBlocked
              }
            : {}
        )
      }));
      setSuccessMsg(data?.message || "Profile updated successfully.");
      setEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      setError(error?.response?.data?.message || error?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axiosClient.get('/auth/logout');
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setError(error?.response?.data?.message || "Failed to logout.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <div className="text-slate-600 font-semibold">Loading profile...</div>
        </div>
      </main>
    );
  }

  const {
    firstName,
    contact,
    emailId,
    aadhar,
    role,
    skills = [],
    verified,
    rating,
    ratingCount,
    isBlocked,
    location,
    avatarUrl,
    activeCases,
    createdAt
  } = profile;

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-5" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-black bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              My Profile
            </h1>
            <p className="text-slate-600 font-medium">Manage your KaamSetu account details</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {verified ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4" /> Verified
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-amber-100 to-orange-100 text-amber-700 font-bold">
                <AlertCircle className="w-4 h-4" /> Not Verified
              </div>
            )}

            <button
              onClick={() => {
                setEditing((val) => !val);
                setError("");
                setSuccessMsg("");
              }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
                editing
                  ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Edit2 className="w-4 h-4" />
              <span>{editing ? "Editing" : "Edit Profile"}</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-rose-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-600 transition-all"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Avatar Section */}
          <div className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl overflow-hidden bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl border-4 border-white/30">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-white/70" />
                  )}
                </div>

                <button
                  onClick={handleAvatarPick}
                  className="absolute -bottom-2 -right-2 bg-white text-emerald-600 p-3 rounded-2xl hover:bg-emerald-50 shadow-lg transition-all border-2 border-white"
                  title="Upload avatar"
                  disabled={avatarUploading}
                >
                  {avatarUploading ? (
                    <div className="w-5 h-5 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>

              <div className="flex-1 text-white">
                <h2 className="text-3xl font-black mb-2">{firstName || "Your name"}</h2>
                <div className="text-emerald-100 font-medium mb-4">{emailId || "No email"}</div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm">
                    <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                    <span className="font-bold">{rating?.toFixed?.(1) ?? 0}</span>
                    <span className="text-sm text-white/80">({ratingCount ?? 0})</span>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm font-semibold">
                      {location?.coordinates && location.coordinates[0] !== 0
                        ? `${location.coordinates[0].toFixed(2)}, ${location.coordinates[1].toFixed(2)}`
                        : "No location"}
                    </span>
                  </div>

                  <div className={`px-4 py-2 rounded-xl font-bold uppercase text-sm ${
                    isBlocked ? "bg-rose-500" : "bg-white/20 backdrop-blur-sm"
                  }`}>
                    {isBlocked ? "Blocked" : role}
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black text-white mb-1">—</div>
                  <div className="text-xs text-emerald-100 font-semibold uppercase tracking-wider">Jobs Applied</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-white mb-1">{activeCases ?? 0}</div>
                  <div className="text-xs text-emerald-100 font-semibold uppercase tracking-wider">Active Cases</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-700 font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            {successMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-700 font-semibold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                {successMsg}
              </div>
            )}

            {!editing ? (
              // READ-ONLY VIEW
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem label="Full name" value={firstName || "-"} />
                <InfoItem label="Contact" value={contact || "-"} icon={<Phone className="w-4 h-4" />} />
                <InfoItem label="Aadhar" value={aadhar || "-"} />
                <InfoItem label="Role" value={role} />
                <InfoItem label="Verified" value={verified ? "Yes" : "No"} />
                <InfoItem label="Account status" value={isBlocked ? "Blocked" : "Active"} />

                <div className="md:col-span-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {skills && skills.length ? (
                      skills.map((s) => (
                        <span key={s} className="px-4 py-2 bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-bold">
                          {s}
                        </span>
                      ))
                    ) : (
                      <div className="text-sm text-slate-500">No skills added</div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // EDIT MODE
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Full name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                      className="text-black w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Contact</label>
                    <input
                      type="tel"
                      value={contact}
                      onChange={(e) => setProfile((p) => ({ ...p, contact: e.target.value }))}
                      className="text-black w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Aadhar (optional)</label>
                    <input
                      type="text"
                      value={aadhar || ""}
                      onChange={(e) => setProfile((p) => ({ ...p, aadhar: e.target.value }))}
                      className="text-black w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
                      maxLength={12}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Role</label>
                    <input
                      type="text"
                      value={role}
                      readOnly
                      className="text-black w-full px-4 py-3 rounded-2xl bg-slate-100 border-2 border-slate-200 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_SKILLS.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`text-black px-4 py-2 rounded-full text-sm font-bold transition-all ${
                          skills.includes(skill)
                            ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                            : "bg-white border-2 border-slate-300 text-slate-700 hover:border-emerald-400"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Location (coordinates)</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={
                        location?.coordinates ? `${location.coordinates[0]}, ${location.coordinates[1]}` : ""
                      }
                      onChange={(e) => {
                        const raw = e.target.value;
                        const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);
                        if (parts.length === 2) {
                          const lng = Number(parts[0]);
                          const lat = Number(parts[1]);
                          if (!isNaN(lng) && !isNaN(lat)) {
                            setProfile((p) => ({ ...p, location: { type: "Point", coordinates: [lng, lat] } }));
                          }
                        }
                      }}
                      placeholder="lng, lat"
                      className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
                    />
                    <button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      className="px-6 py-3 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all whitespace-nowrap"
                    >
                      Use my location
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    className="px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center gap-2"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" /> Save Changes
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-8 py-4 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                  >
                    <X className="w-5 h-5" /> Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/applications")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all"
            >
              <Briefcase className="w-4 h-4" /> My Applications
            </button>
            <button
              onClick={() => navigate("/disputes")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all"
            >
              <FileText className="w-4 h-4" /> My Disputes
            </button>
          </div>

          <div className="text-sm text-slate-500 font-medium">
            Member since: {createdAt ? new Date(createdAt).toLocaleDateString() : "—"}
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoItem({ label, value, icon }) {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
        {icon}
        {label}
      </div>
      <div className="font-bold text-slate-900">{value}</div>
    </div>
  );
}