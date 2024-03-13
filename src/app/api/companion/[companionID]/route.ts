import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { companionID: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { name, description, instructions, seed, src, categoryId } = body;
    if (!params.companionID) {
      return new NextResponse("Companion ID is required..", { status: 401 });
    }
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
    const companion = await prismadb.companion.update({
      where: { id: params.companionID },
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
    console.log(`[PATCH]`, error);
    return new NextResponse(`Internal Error. Error: ${error}`, { status: 500 });
  }
}
