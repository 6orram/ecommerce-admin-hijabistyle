import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { seasonId: string } }
) {
  try {
    if (!params.seasonId) {
      return new NextResponse("Season id is required", { status: 400 });
    }

    const season = await prismadb.season.findUnique({
      where: {
        id: params.seasonId
      }
    });
  
    return NextResponse.json(season);
  } catch (error) {
    console.log('[SEASON_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { seasonId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.seasonId) {
      return new NextResponse("Season id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const season = await prismadb.season.delete({
      where: {
        id: params.seasonId
      }
    });
  
    return NextResponse.json(season);
  } catch (error) {
    console.log('[SEASON_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { seasonId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }


    if (!params.seasonId) {
      return new NextResponse("Season id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const season = await prismadb.season.update({
      where: {
        id: params.seasonId
      },
      data: {
        name,
        value
      }
    });
  
    return NextResponse.json(season);
  } catch (error) {
    console.log('[SEASON_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
