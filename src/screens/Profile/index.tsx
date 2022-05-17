import React from "react";
import { View, Text, TextInput, Button } from "react-native";

const Profile = () => {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        value="jeandson"
        autoCorrect={false}
      />

      <TextInput
        testID="input-surname"
        value="tenorio"
        placeholder="Sobrenome"
      />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
};

export { Profile };
