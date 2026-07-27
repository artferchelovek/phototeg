import { api } from "./api.ts";

interface RegisterResponse {
  data: {
    user: string;
    token: string;
  };
}

export const registerUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response: RegisterResponse = await api.post("/auth/register", {
      username,
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);

    return { success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false };
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response: { data: { token: string } } = await api.post(
      "/auth/login",
      {
        email,
        password,
      },
    );

    localStorage.setItem("token", response.data.token);

    return { success: true };
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return { success: false, error: e.message };
    }
    return { success: false };
  }
};
