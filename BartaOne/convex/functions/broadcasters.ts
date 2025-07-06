import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createBroadcaster = mutation({
  args: {
    channelName: v.string(),
    channelType: v.string(),
    broadcastLanguages: v.array(v.string()),
    region: v.array(v.string()),
    contactName: v.string(),
    email: v.string(),
    phone: v.string(),
    website: v.string(),
    contentType: v.string(),
    password: v.string(),
    logoUrl: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("broadcasters", args);
  },
});


export const signInBroadcaster = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const broadcaster = await ctx.db
      .query("broadcasters")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!broadcaster) {
      throw new Error("No broadcaster found with this email.");
    }
   
    return {
      id: broadcaster._id,
      email: broadcaster.email,
      channelName: broadcaster.channelName,
    };
  },
});