// 2:57:00 функция за получение данных, возвращение данных и т.д.
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from "next/server";

// GET получение данных
export async function GET() {
    const users = await prisma.user.findMany()
    return NextResponse.json(users);
}

// POST создание данных 3:01:00
export async function POST(req: NextRequest) {
    const data = await req.json();

    const user = await prisma.user.create({
        data
    });

    return NextResponse.json(user)
}
