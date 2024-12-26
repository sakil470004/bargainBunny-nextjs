import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create response that clears the auth cookie
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    // Clear the auth cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}