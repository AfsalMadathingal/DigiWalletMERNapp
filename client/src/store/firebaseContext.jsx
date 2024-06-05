import React, { createContext, useContext, useState } from "react";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {getAuth, } from "firebase/auth";
import { app } from "../firebase";

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);



export const FirebaseProvider = ({ children }) => {

    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);


    const uploadFile = async (file) => {
        return new Promise((resolve, reject) => {
          try {
            const storageRef = ref(storage, `${file.name}`);
            const uploadTask = uploadBytes(storageRef, file);
    
            uploadTask
              .then(async (snapshot) => {
                const downloadURL = await getDownloadURL(snapshot.ref);
                console.log("File available at", downloadURL);
                resolve(downloadURL);
              })
              .catch((error) => {
                
                console.log("Upload error", error);
                reject(error);
              });
          } catch (error) {
            console.log(error);
            reject(error);
          }
        });
      };


      return (
        <FirebaseContext.Provider
          value={{
            uploadFile,
          }}
        >
          {children}
        </FirebaseContext.Provider>
      );

}