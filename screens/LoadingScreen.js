import React, {useEffect} from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Auth } from 'aws-amplify';

export default function LoadingScreen(props) {
	useEffect(() => {
		async function AuthUserLoading(){
		try {
			const user = await Auth.currentAuthenticatedUser();
			props.navigation.navigate('App', { user: user });
		} catch (err) {
			props.setGoToAuthTrue(true);
			// this.props.navigation.navigate('Auth');
		}
	};
	AuthUserLoading();
	});

	// Shows a loading animation
	return (
		<View style={styles.container}>
			<View>
				<Image
					style={{
						width: 180,
						height: 180,
						marginBottom: 90
					}}
					source={require('../assets/MISU_White.png')}
				/>
			</View>
			<Text
				style={{
					fontSize: 24,
					marginBottom: 16
				}}
			>
				Loading...
			</Text>
			<ActivityIndicator size="large" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
