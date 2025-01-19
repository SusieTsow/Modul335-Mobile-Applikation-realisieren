# UEK335 Abschlussprojekt

Informatik EFZ Module an der Benedict Schule

This project is a React Native application that provides various levels of challenges in different categories. Users can track their progress and navigate through different levels.

## Features

- Implement user authentication with Firebase.
- Use the Expo Sensor Gyroscope as an alternative input method.
- Track progress for each challenge level.
- Enable navigation through various challenge levels.
- Add logout functionality.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/UEK335_Abschlussprojekt.git
   cd UEK335_Abschlussprojekt
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Add an Android/iOS app to your Firebase project.
   - Download the `google-services.json` (for Android) or `GoogleService-Info.plist` (for iOS) and place it in the appropriate directory.
   - Update the Firebase configuration in `firebaseConfig.js`.

4. Run the application:
   ```sh
   npm run android   # for Android
   npm run ios       # for iOS
   ```

## Usage

- After launching the app, sign in or sign up to create an account.
- Navigate through the levels and track your progress.
- Use the logout button to sign out of your account.

## Project Structure

- `components/`: Contains reusable UI components.
- `constants/`: Contains theme and other constant values.
- `firebaseConfig.js`: Firebase configuration file.
- `app/Levels.js`: Main screen for displaying levels and progress.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](./LICENSE) file for details.
