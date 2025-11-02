import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import styles from './styles';
import Rating from '../rating';

const Restaurent = ({title, data, navigation}) => {
return(
    <View style= {styles.container}>
        <View style={styles.row}>
            <Text style={styles.title}>{title}</Text>
        </View>
        <FlatList 
            data={data}
            horizontal= {true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
                return(
                    <TouchableOpacity style={styles.item} onPress= {() => {
                        navigation.navigate('restaurent');
                    }}> 
                        <View>
                            <Image source={{uri: item.image_url}} style={styles.image} resizeMode='cover'/>
                        </View>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.address}>Prix: {item.money}</Text>
                    <View style={styles.rating}>
                        <Rating count={item.rating}/>
                        <Text style={styles.address2}>({item.review_count} reviews)</Text>
                    </View>
                </TouchableOpacity>
                )
            }
            }


        />
    </View>
)

}

export default Restaurent;