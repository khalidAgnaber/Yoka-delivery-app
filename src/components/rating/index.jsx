// src/components/rating/Rating.js
import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { COLORS } from '../../constants/theme';

const Rating = ({ count }) => {
  const [starCount] = useState(count);
  const rating = [];

  function isInt(n) {
    return n % 1 === 0;
  }

  // Fill in the filled stars
  for (let i = 0; i < Math.floor(starCount); i++) {
    rating.push(<Icon key={`star-filled-${i}`} name="star" size={15} color={COLORS.yellow} />);
  }

  // Add a half star if the count is not an integer
  if (!isInt(starCount)) {
    rating.push(<Icon key="star-half" name="star-half-empty" size={15} color={COLORS.yellow} />);
  }

  // Fill in the remaining stars with empty stars
  for (let i = rating.length; i < 5; i++) {
    rating.push(<Icon key={`star-empty-${i}`} name="star" size={15} color={COLORS.grey} />);
  }

  return <View style={styles.rating}>{rating}</View>;
};

export default Rating;
