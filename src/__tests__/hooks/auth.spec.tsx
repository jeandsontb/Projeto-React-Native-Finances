import "jest-fetch-mock";
import fetchMock from "jest-fetch-mock";
import { renderHook, act } from "@testing-library/react-hooks";

import { AuthProvider, useAuth } from "../../hooks/auth";

// Ativa o uso do fetch mock
fetchMock.enableMocks();

// Define uma resposta padrão para o response do fetch
fetchMock.mockResponse(
  JSON.stringify({
    id: "test-id",
    given_name: "John Doe",
    email: "any@email.com",
    picture: "any.png",
  })
);

// Mock Auth Session do expo-auth-session
jest.mock("expo-auth-session", () => ({
  startAsync: () => ({
    type: "success",
    params: { access_token: "test-token" },
  }),
}));

describe("Auth Hook", () => {
  it("Deve verificar se já existe uma conta cadastrada", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.signInGoogle();
    });
    expect(result.current.user.email).toBe("any@email.com");
  });
});
