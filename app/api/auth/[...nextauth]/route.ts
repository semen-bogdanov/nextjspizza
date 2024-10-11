import { authOptions } from '@/shared/constants/auth-options'
import NextAuth from 'next-auth'

const handler = NextAuth(authOptions)
//19:45:00
export { handler as GET, handler as POST }
