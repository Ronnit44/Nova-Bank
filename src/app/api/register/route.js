import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/User';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    const cookie = serialize('session', JSON.stringify({ email: newUser.email, role: newUser.role }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    const response = NextResponse.json({ message: 'Registration successful', user: { email: newUser.email, role: newUser.role } });
    response.headers.append('Set-Cookie', cookie);

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Error during registration', error: error.message }, { status: 500 });
  }
}
