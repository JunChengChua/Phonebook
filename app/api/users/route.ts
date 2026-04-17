// app/api/users/route.ts
import { NextResponse } from "next/server";
// app/api/users/route.ts
export const dynamic = "force-dynamic"; 
import { getClientPromise } from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await getClientPromise();

    const db = client.db("UserInfo");
    // const users = await db
    //   .collection("UserInfo")
    //   .find({})
    //   .toArray();

    const users = await db
      .collection("Users")
      .find({})
      .toArray();

    const serializedUsers = users.map((user) => ({
      ...user,
      _id: user._id.toString(),
}));

return NextResponse.json(serializedUsers);

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}