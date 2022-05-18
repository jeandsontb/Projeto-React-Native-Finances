import { renderHook, act } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";
import { startAsync } from "expo-auth-session";
import fetchMock from "jest-fetch-mock";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthProvider, useAuth } from "../../hooks/auth";

jest.mock("expo-auth-session");

fetchMock.enableMocks();

describe("Auth Hook", () => {
  beforeEach(async () => {
    const userCollectionKey = "@gofinances:user";
    await AsyncStorage.removeItem(userCollectionKey);
  });

  it("Verifica se existe uma conta", async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });

    const userTest = {
      id: "any_id",
      email: "any@email.com",
      name: "Any",
      photo: "any_photo.png",
    };

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInGoogle());

    expect(result.current.user.email).toBeTruthy();
  });
});
