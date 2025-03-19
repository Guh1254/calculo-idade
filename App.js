import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// coloquei isso para formatar a data separando por "/"
const formatarData = (text, setDataNascimento) => {
  let cleaned = text.replace(/\D/g, '');
  if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);
  let formatted = cleaned;
  if (cleaned.length > 4) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(
      4
    )}`;
  } else if (cleaned.length > 2) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  }
  setDataNascimento(formatted);
};

const calcularIdade = (dataNascimento, setResultado) => {
  if (!dataNascimento || dataNascimento.length !== 10) {
    setResultado('Por favor, insira uma data válida.');
    return;
  }

  const partes = dataNascimento.split('/');
  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const ano = parseInt(partes[2], 10);
  const nascimento = new Date(ano, mes, dia);

  if (isNaN(nascimento.getTime())) {
    setResultado('Formato inválido! Use DD/MM/AAAA.');
    return;
  }

  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();

  if (mesAtual < mes || (mesAtual === mes && diaAtual < dia)) {
    idade--;
  }

  let categoria = '';
  if (idade <= 19) categoria = 'Jovem';
  else if (idade >= 20 && idade <= 59) categoria = 'Adulto';
  else categoria = 'Idoso';

  setResultado(`Idade: ${idade} anos.\nCategoria: ${categoria}`);
};

const App = () => {
  const [dataNascimento, setDataNascimento] = useState('');
  const [resultado, setResultado] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Idade</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua data de nascimento (DDMMAAAA)"
        value={dataNascimento}
        onChangeText={(text) => formatarData(text, setDataNascimento)}
        keyboardType="numeric"
        maxLength={10}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => calcularIdade(dataNascimento, setResultado)}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
      {resultado ? <Text style={styles.result}>{resultado}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3fbfc',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a616a',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#74847c',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#32bacc',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#1a616a',
  },
});

export default App;
