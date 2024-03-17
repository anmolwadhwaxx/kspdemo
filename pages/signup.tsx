import { useState } from "react";
import type { NextPage } from "next";
import { signupAPI, createWalletAPI, retrieveWallet } from "../utils/apis/api";
import { Layout } from "../components";
import { Button, Card, Input, Link } from "@nextui-org/react";
import Router from "next/router";

export interface SignUp {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPass: string;
  gender: string; // Add gender field
}

const Signup: NextPage = () => {
  const [signupDetails, setSignupDetails] = useState<SignUp>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPass: "",
    gender: "", // Initialize gender field
  });

  const handleChange = (e: { target: { value: string; name: string } }) => {
    const { value, name } = e.target;
    setSignupDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email } = signupDetails;
    const allowedEmails = ["psi@ksp.com", "pi@ksp.com", "dysp@ksp.com"];
    
    if (allowedEmails.includes(email)) {
      localStorage.setItem("email", signupDetails.email);
      Router.push("/account"); // Redirect to AppLoginPage if email is in the allowed list
      return; // Prevent further execution of signupAPI
    }

    await signupAPI({
      username: signupDetails.username,
      email: signupDetails.email,
      firstName: signupDetails.firstName,
      lastName: signupDetails.lastName,
      password: signupDetails.password,
      gender: signupDetails.gender, // Include gender in the API call
    });
    await createWalletCall();
  };

  const createWalletCall = async () => {
    // calling backend to create wallet
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      const res = await createWalletAPI(user_id);
      const res1 = await retrieveWallet(user_id);
      // Router.push("/account");
    }
  };

  return (
    <Layout>
      <div className="md:w-[400px] w-[350px] mx-auto">
        <Card
          css={{
            marginTop: "4rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card.Body>
            <form
              className="px-4 py-4"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
             <h1 className="mb-8 text-3xl text-center">Login</h1>
               {/* <Input
                type="text"
                className="mb-4"
                fullWidth
                name="username"
                placeholder="Username"
                value={signupDetails.username}
                onChange={handleChange}
              /> */}
              <Input
                type="text"
                className="mb-4"
                fullWidth
                name="email"
                placeholder="Please Enter Your Email ID"
                value={signupDetails.email}
                onChange={handleChange}
              />
              {/* <Input
                type="text"
                className="mb-4"
                fullWidth
                name="firstName"
                placeholder="First Name"
                value={signupDetails.firstName}
                onChange={handleChange}
              />
              <Input
                type="text"
                className="mb-4"
                fullWidth
                name="lastName"
                placeholder="Last Name"
                value={signupDetails.lastName}
                onChange={handleChange}
              />

              <select
                name="gender"
                value={signupDetails.gender}
                onChange={handleChange}
                className="w-full mb-4 p-2 border rounded-md text-sm text-gray-400 bg-gray-100"
              >
                <option value="">Select Position</option>
                <option value="position1">Position 1</option>
                <option value="position2">Position 2</option>
                <option value="position3">Position 3</option>
                <option value="position4">Position 4</option>
                <option value="position5">Position 5</option>
              </select> */}

              <Input
                type="password"
                className="mb-4"
                fullWidth
                name="password"
                placeholder="Please Enter Your Password"
                value={signupDetails.password}
                onChange={handleChange}
              />
              {/* <Input
                type="password"
                className="mb-4"
                fullWidth
                name="confirmPass"
                placeholder="Confirm Password"
                value={signupDetails.confirmPass}
                onChange={handleChange}
              /> */}

              <Button type="submit" css={{ width: "100%" }}>
               Submit
              </Button>
            </form>
          </Card.Body>
          {/* <Card.Footer>
            <div className="flex flex-row mx-auto">
              <div>Already a user? &nbsp;</div>
              <Link color="primary" target="_blank" href="/login">
                Login here!
              </Link>
            </div>
          </Card.Footer> */}
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;
