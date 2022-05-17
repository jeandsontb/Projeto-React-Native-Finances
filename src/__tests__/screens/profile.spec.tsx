import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

describe("Profile", () => {
  it("Verifica se o input placeholder correto está na tela", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");

    expect(inputName.props.placeholder).toBeTruthy();
  });

  it("Checa se o usuário está carregando", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("input-name");
    const inputSurname = getByTestId("input-surname");

    expect(inputName.props.value).toEqual("jeandson");
    expect(inputSurname.props.value).toEqual("tenorio");
  });

  it("Checa se o título está correto", () => {
    const { getByTestId } = render(<Profile />);

    const textInput = getByTestId("text-title");
    expect(textInput.props.children).toEqual("Perfil");
  });
});
