const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import '@testing-library/jest-dom'

global.fetch = jest.fn()

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {},
    pathname: '/',
  }),
}))

process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000'