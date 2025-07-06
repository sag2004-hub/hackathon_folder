import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  broadcasters: defineTable({
    channelName: v.string(),
    channelType: v.string(),
    broadcastLanguages: v.array(v.string()),
    region: v.array(v.string()),
    contactName: v.string(),
    email: v.string(),
    phone: v.string(),
    website: v.string(),
    contentType: v.string(),
    password: v.string(), // ⚠️ Hash this in production
    logoUrl: v.string(), // ✅ NEW: logo field (Cloudinary, Convex, etc.)
  }),
});
