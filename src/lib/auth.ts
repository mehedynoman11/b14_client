import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { admin, jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("b14_client");

const roles = ["customer", "vendor", "admin"] as const;
type Role = (typeof roles)[number];

const isRole = (value: unknown): value is Role =>
  typeof value === "string" && (roles as readonly string[]).includes(value);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    // The admin plugin owns `user.role` and declares it as `input: false`, so
    // `role` can never be sent to /sign-up/email (it throws
    // "role is not allowed to be set"). The signup form sends `accountType`
    // instead and the database hook below copies it into `role`.
    admin({ defaultRole: "customer" }),
    jwt(),
  ],
  user: {
    additionalFields: {
      accountType: {
        type: [...roles],
        input: true,
        defaultValue: "customer",
        returned: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const { accountType, ...rest } = user as typeof user & {
            accountType?: Role;
          };
          return {
            data: {
              ...rest,
              role: isRole(accountType) ? accountType : "customer",
            },
          };
        },
      },
    },
  },
});
