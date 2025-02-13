import { useGoogleLogin } from '@react-oauth/google';

export default function GoogleLoginButton({ onSuccess, onError }) {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log('Login Success:', response);
      onSuccess(response);
    },
    onError: () => {
      console.log('Login Failed');
      onError();
    },
    scope: 'https://www.googleapis.com/auth/calendar',
    flow: 'implicit',
  });

  return (
    <button 
      onClick={login}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Sign in with Google
    </button>
  );
}