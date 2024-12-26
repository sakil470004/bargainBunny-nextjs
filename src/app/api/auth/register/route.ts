import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    // Log the start of the connection attempt
    console.log('Attempting to connect to MongoDB...');
    
    await connectDB();
    console.log('Successfully connected to MongoDB');
    
    const { name, email, password } = await req.json();
    console.log('Received registration data:', { name, email });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user
    console.log('Creating new user...');
    const user = await User.create({
      name,
      email,
      password,
    });
    console.log('User created successfully');

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: '30d' }
    );

    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    }, { 
      status: 201,
      headers: {
        'Set-Cookie': `token=${token}; Path=/; HttpOnly; Max-Age=2592000; SameSite=Strict`
      }
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}