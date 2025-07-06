import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

export default function BroadcasterSignUp() {
  const [form, setForm] = useState({
    channelName: "",
    channelType: "",
    broadcastLanguages: "",
    region: "",
    logo: null,
    contactName: "",
    email: "",
    phone: "",
    website: "",
    contentType: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const createBroadcaster = useMutation(api.functions.broadcasters.createBroadcaster);
  const generateUploadUrl = useMutation(api.uploadLogo.generateUploadUrl);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "region" || name === "broadcastLanguages") {
      setForm((prev) => ({
        ...prev,
        [name]: value.split(",").map((v) => v.trim()),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      let logoUrl = "";

      if (form.logo) {
        const uploadUrl = await generateUploadUrl();
        const formData = new FormData();
        formData.append("file", form.logo);

        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        const { storageId } = await response.json();
        logoUrl = storageId ? `/api/storage/${storageId}` : "";
      }

      await createBroadcaster({
        channelName: form.channelName,
        channelType: form.channelType,
        broadcastLanguages: form.broadcastLanguages,
        region: form.region,
        contactName: form.contactName,
        email: form.email,
        phone: form.phone,
        website: form.website,
        contentType: form.contentType,
        password: form.password,
        logoUrl,
      });

      alert("Broadcaster registered successfully!");
      navigate("/broadcaster-signin"); // ✅ Redirect after signup
    } catch (err) {
      console.error(err);
      alert("Error during sign-up. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 to-slate-800 flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left section – branding */}
        <div className="bg-gradient-to-br from-blue-800 to-blue-600 p-10 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Join BartaOne!</h1>
          <p className="text-lg mb-2">
            Start <span className="font-semibold text-blue-200">streaming</span>,{" "}
            <span className="font-semibold text-blue-200">publishing</span>, and{" "}
            <span className="font-semibold text-blue-200">growing</span> today.
          </p>
          <p className="text-sm opacity-80">Build your presence. Be heard. Be seen.</p>
        </div>

        {/* Right section – form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 md:p-10 space-y-5 bg-white"
        >
          <h2 className="text-2xl font-bold text-gray-800">Broadcaster Sign Up</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="channelName" placeholder="Channel Name*" required value={form.channelName} onChange={handleChange} className="input-style" />
            <select name="channelType" required value={form.channelType} onChange={handleChange} className="input-style">
              <option value="">Channel Type*</option>
              <option value="news">News</option>
              <option value="music">Music</option>
              <option value="education">Education</option>
            </select>

            <input name="broadcastLanguages" placeholder="Languages (comma separated)*" required value={form.broadcastLanguages} onChange={handleChange} className="input-style" />
            <input name="region" placeholder="Region(s) Covered* (e.g., Kolkata, Howrah)" required value={form.region} onChange={handleChange} className="input-style" />
            <input type="file" name="logo" accept="image/*" onChange={handleChange} className="input-style bg-white file:bg-blue-100 file:rounded file:px-3 file:py-1" />
            <input name="contactName" placeholder="Contact Person Name*" required value={form.contactName} onChange={handleChange} className="input-style" />
            <input type="email" name="email" placeholder="Email Address*" required value={form.email} onChange={handleChange} className="input-style" />
            <input name="phone" placeholder="Phone Number*" required value={form.phone} onChange={handleChange} className="input-style" />
            <input name="website" placeholder="Website / Livestreaming Link*" required value={form.website} onChange={handleChange} className="input-style" />
            <select name="contentType" required value={form.contentType} onChange={handleChange} className="input-style">
              <option value="">Content Type Telecasted*</option>
              <option value="news">News</option>
              <option value="entertainment">Entertainment</option>
              <option value="education">Educational</option>
            </select>
            <input type="password" name="password" placeholder="Create Password*" required value={form.password} onChange={handleChange} className="input-style" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password*" required value={form.confirmPassword} onChange={handleChange} className="input-style" />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
