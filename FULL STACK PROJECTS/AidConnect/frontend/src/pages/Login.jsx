import { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(name, email, password);

  function handleSubmit(event) {
    event.preventDefault();    
  }

  return (
    <div className="flex justify-center mt-20 max-w-[350px] shadow-2xl min-h-[45vh] mx-auto rounded-2xl  text-zinc-500 font-medium">
      <form
        className="flex flex-col items-base my-6 gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-2xl font-medium">
              {state === "Sign Up" ? "Create Account" : "Log In"}
            </p>
            <p>
              Please {state === "Sign Up" ? "sign up" : "log in"} to book
              appointment
            </p>
          </div>
          {state === "Sign Up" ? (
            <>
              <p id="name">Full Name</p>
              <input
                type="text"
                id="NAME"
                className="border-1 border-zinc-300 rounded-lg focus-visible:outline-1 outline-zinc-400"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </>
          ) : null}
          <label htmlFor="EMAIL" id="name">
            Email
          </label>
          <input
            type="email"
            id="EMAIL"
            className="border-1 border-zinc-300  rounded-lg focus-visible:outline-1 outline-zinc-400"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="PASSWORD" id="name">
            Password
          </label>
          <input
            type="password"
            id="PASSWORD"
            className="border-1 border-zinc-300  rounded-lg focus-visible:outline-1 outline-zinc-400"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="  mt-2 w-40 text-center py-1 rounded-lg bg-blue-400 cursor-pointer text-white">
            {state === "Sign Up" ? "Create Account" : "Log In"}
          </button>
          {state === "Sign Up" ? (
            <p className="text-sm">
              Already have an account ?
              <span
                className="cursor-pointer hover:opacity-50 "
                onClick={() => setState("Sign In")}
              >
                {" "}
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm">
              Create a new account ?{" "}
              <span
                className="cursor-pointer hover:opacity-50 "
                onClick={() => setState("Sign Up")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
