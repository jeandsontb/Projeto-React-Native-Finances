import React from "react";
import { View, Text, TextInput, Button } from "react-native";

const Profile = () => {
  return (
    <View>
      <Text>Perfil</Text>

      <TextInput placeholder="Nome" autoCorrect={false} />

      <TextInput placeholder="Sobrenome" />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  );
};

export { Profile };
