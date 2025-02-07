// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLogInMutation } from "store/services";
import { useDispatch } from "react-redux";
import { triggerToken } from "store/reducer";

export default function LoginPage() {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLogInMutation();

  const saveDetails = (userDetails) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    router.push("/");

    if (!userName || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await login({
        body: { userName: userName, password: password },
      }).unwrap();
      saveDetails(response);
      dispatch(triggerToken());
      router.push("/");
    } catch (err) {
      setError(err?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full  bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? "Please wait" : " Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
