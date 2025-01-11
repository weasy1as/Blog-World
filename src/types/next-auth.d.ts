import "next-auth";

declare module "next-auth" {
  interface User {
    id: number; // Add the `id` field to the User type
    name: string;
    email: string;
  }

  interface Session {
    user: User; // Update the Session type to include the extended User type
  }
}
