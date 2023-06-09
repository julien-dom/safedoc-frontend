// Fonction pour séparer les mots par un espace lors des maps sur infos docs
// Elle se répète plusieurs fois dans code, mise à part et exportée

import { Text } from 'react-native';

export function separateWords(list) {
    return list.map((word, index) => (
      <Text key={index}>
        {word}
        {index < list.length - 1 ? ", " : ""}
      </Text>
    ));
  }