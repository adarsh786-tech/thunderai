import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { name, description, instructions, seed, src, categoryId } = body;
    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse("Required fields are missing", { status: 500 });
    }
    const companion = await prismadb.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        srcImage: src,
        name,
        description,
        instructions,
        seed,
      },
    });
    return NextResponse.json(companion);
  } catch (error) {
    console.log(`[POST]`, error);
    return new NextResponse(`Internal Error. Error: ${error}`, { status: 500 });
  }
}
