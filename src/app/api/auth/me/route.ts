import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    const headersList =await headers();
    const cookieHeader = headersList.get('cookie');
    
    // Better cookie parsing
    const tokenCookie = cookieHeader?.split(';')
      .find(cookie => cookie.trim().startsWith('token='));
    const token = tokenCookie?.split('=')[1];

    console.log('Token found:', !!token); // Debug log

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No token found' },
        { status: 401 }
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallbacksecret') as { id: string };
      console.log('Token decoded:', !!decoded); // Debug log

      await connectDB();
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image
        }
      });

    } catch (jwtError) {
      console.error('JWT Verification failed:', jwtError);
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('ME endpoint error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}