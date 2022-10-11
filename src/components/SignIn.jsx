import Text from "./Text";
import {Pressable, StyleSheet, View} from "react-native";
import FormikTextInput from "./FormikTextInput";
import {Formik} from "formik";
import theme from "../theme";
import * as yup from 'yup';

import useSignIn from "../hooks/useSignIn";
import authStorage from "../utils/authStorage";


const validationSchema = yup.object().shape({
	username: yup
		.string()
		.min(3, 'The username must be at least 3 characters long')
		.required('Username is required'),
	password: yup
		.string()
		.min(5, 'The password must be at least 5 characters long')
		.required('Password is required'),
});

const styles = StyleSheet.create({
	formContainer: {
		marginHorizontal: 10,
		marginVertical: 5,
	},
	submitButton: {
		backgroundColor: theme.colors.primary,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 5
	},
	inputField: {
		borderStyle: "solid",
		borderColor: theme.colors.textSecondary,
		borderWidth: 1,
		borderRadius: 5,
		marginVertical: 10,
		height: 35,
		padding: 10,
	}
})

const SignInForm = ({onSubmit}) => {
	return (
		<View style={styles.formContainer} fullwidth>
			<FormikTextInput name={"username"} placeholder={"Username"} style={styles.inputField}/>
			<FormikTextInput name={"password"} placeholder={"Password"} style={styles.inputField} secureTextEntry />
			<Pressable onPress={onSubmit} style={styles.submitButton}>
				<Text fontSize={"subheading"} style={{marginVertical: 10, color: "white"}}>Sign in</Text>
			</Pressable>
		</View>
	)
};

const SignIn = () => {
	// Declare the hook
	const [signIn] = useSignIn();
	// Create a new authStorage instance with a namespace
	const authStorageInstance = new authStorage('auth');

	const onSubmit = async (values) => {
		// Get the username and password from the values
		const {username, password} = values;
		try {
			// Try to sign in
			const data = await signIn({ username, password });
			// Store the token in the authStorage
			await authStorageInstance.setAccessToken(data.authenticate.accessToken);
		} catch (e) {
			console.log(e);
		}
	};

	const initialValues = {
		username: '',
		password: ''
	}

	return (
		<View style={{backgroundColor: "white"}}>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
				{({handleSubmit}) => <SignInForm onSubmit={handleSubmit} /> }
			</Formik>
		</View>
	)
}

export default SignIn;