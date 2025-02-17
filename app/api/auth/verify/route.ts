import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code');

    if (!code) {
      return new NextResponse('Invalid code', { status: 400 });
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });

    if (!verificationCode) {
      return new NextResponse('Invalid code', { status: 400 });
    }

    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        verified: new Date(),
      },
    }).catch((error) => {
      console.error('Error updating user:', error);
      return new NextResponse('Failed to verify user', { status: 500 });
    });

    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    }).catch((error) => {
      console.error('Error deleting verification code:', error);
      return new NextResponse('Failed to delete verification code', { status: 500 });
    });

    return new NextResponse(null, { status: 303, headers: { Location: '/?verified' } });
  } catch (error) {
    console.error('Error verifying user:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
