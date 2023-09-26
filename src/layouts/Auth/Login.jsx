import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {supabase} from "../../../services/supabase.js";

const Login = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const login = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const {error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            }
        )
        setIsLoading(false)
        if (error === null) {
            setError(false)
            setEmail("")
            setPassword("")
            navigate("/")
        } else {
            setError(true)
        }
        console.log(error)
    }
    return (
        <section className='max-w-screen-xl min-h-screen px-3 flex justify-center items-center'>
            <main
                className="w-full flex items-center justify-center py-8"
            >
                <div className="w-full md:w-auto">
                    <div className="text-center">
                        <h1
                            className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
                        >
                            Welcome to JK Mobile
                        </h1>

                        <p className="mt-4 leading-relaxed text-gray-500">
                            Log in your account!
                        </p>
                    </div>

                    <form onSubmit={login} className="mt-8 grid grid-cols-6 gap-6">
                        {
                            error && <div className="col-span-6 rounded border-s-4 border-red-500 bg-red-50 p-4">
                                <div className="flex items-center gap-2 text-red-800">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>

                                    <strong className="block font-medium"> Something went wrong </strong>
                                </div>
                            </div>
                        }
                        <div className="col-span-6">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>

                            <input
                                required
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                type="email"
                                id="email"
                                name="email"
                                className="py-1.5 px-2 mt-1 w-full rounded-md border-blue-500 focus:border-blue-500 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <input
                                required
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                type="password"
                                id="password"
                                name="password"
                                className="py-1.5 px-2 mt-1 w-full rounded-md border-blue-500 focus:border-blue-500 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>
                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                            <button
                                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                            >
                                Login
                            </button>
                            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                You have not an account?
                                <Link to='/signup' className="text-gray-700 underline">Register</Link>.
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </section>
    );
};

export default Login;
