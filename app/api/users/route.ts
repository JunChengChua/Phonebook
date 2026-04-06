// app/api/users/route.ts
// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("hospital"); // your DB name
//     const users = await db
//       .collection("users") // your collection name
//       .find({})
//       .toArray();

//     return NextResponse.json(users);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to fetch users" },
//       { status: 500 }
//     );
//   }
// }

// app/api/users/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;

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