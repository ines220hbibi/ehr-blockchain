/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {model.SampleTransaction} sampleTransaction
 * @transaction
 */
async function SampleTransaction(tx) {  // eslint-disable-line no-unused-vars
  	
    // Save the old value of the asset.
    // Get the asset registry for the asset.
	var factory = getFactory();
    var practitioner = factory.newRelationship('model', 'Practitioner', '2');
    tx.practitioner = practitioner;
	var msg = getAssetRegistry('model.Allergies')
      .then((allergieAssetRegistry) => {
    	var factory = getFactory();
      var allergy = factory.newResource('model', 'Allergies', 'allergy2');
      allergy.name = 'ward';
      allergy.treatmentBrief = 'simple desc';
      allergy.practitioner = tx.practitioner;
      allergieAssetRegistry.add(allergy);
    });
  console.log(msg);
    // Emit an event for the modified asset.
    let event = getFactory().newEvent('model', 'SampleEvent');
    event.allergyName = "aaa";
    emit(event);

}



/**
 * PharmacyAddDrug transaction
 * @param {model.PharmacyAddDrug} PharmacyAddDrug
 * @transaction
 * @author Mohamed Abdelhafidh
 */

async function PharmacyAddDrug(tx) {    
    /**
     * Getting the Factory for creating new events and resources
     */
    let factory = getFactory();
    /**
     * Getting the Patient Registry to update the model later
     */
        return getParticipantRegistry('model.Patient').then((patientRegistry) => {
            /**
             * Pushing the new drug into the patient's pharmacy drug collection
             */
         tx.patient.pharmacyDrugs.push(tx.drug);
         /**
          * Updating the patient with the new details
          */
            patientRegistry.update(tx.patient);
    }).then(() => {
        /**
         * Firing the event of completion
         */
        let event = factory.newEvent('model', 'PharmacyAddDrugFinished');
        event.details = 'The Drug ' + tx.drug.name +' has been added successfully to ' + tx.patient.firstName + ' ' + tx.patient.lastName + '\'smedical record';
        console
        emit(event);
        });
    
}

/**
 * PharmacyAddDrug transaction
 * @param {model.PharmacyAddDrugFromPrescription} PharmacyAddDrugFromPrescription
 * @transaction
 * @author Mohamed Abdelhafidh
 */
async function PractitonerAddDrugFromPrescription(tx) {
    /**
     * Getting the targeted patient
     */
    let patient = tx.patient;

    /**
     * Getting the Factory, Asset and Participant Registries
     */
    let factory = getFactory();
    let prescriptionRegistry = getAssetRegistry('model.Prescription');
    let patientRegistry = getParticipantRegistry('model.Practitioner');

}
/**
 * PharmacyAddDrug transaction
 * @param {model.PractitionerAddDrug} PractitionerAddDrug
 * @transaction
 * @author firas mrad
 */
async function PractitionerAddDrug(tx) {    
    /**
     * Getting the Factory for creating new events and resources
     */
    let factory = getFactory();
    /**
     * Getting the Patient Registry to update the model later
     */
        return getParticipantRegistry('model.Patient').then((patientRegistry) => {
            /**
             * Pushing the new drug into the patient's pharmacy drug collection
             */
                    if(typeof tx.patient.practitionerDrugs !== 'object' || tx.patient.practitionerDrugs !== Array) {
    tx.patient.practitionerDrugs = [];
}
         tx.patient.practitionerDrugs.push(tx.drug);
         /**
          * Updating the patient with the new details
          */
            patientRegistry.update(tx.patient);
    }).then(() => {
        /**
         * Firing the event of completion
         */
        let event = factory.newEvent('model', 'PractitionerAddDrugFinished');
        event.details = 'The Drug ' + tx.drug.name +' has been added successfully to ' + tx.patient.firstName + ' ' + tx.patient.lastName + '\' medical record';
        console
        emit(event);
        });
    
}


/**
 * PatientAddNutrition transaction
 * @param {model.PatientAddNutrition} PatientAddNutrition
 * @transaction
 * @author Ines HBIBI
 */
async function PatientAddNutrition(tx) {    
    
  
  
  
    let factory = getFactory();
   var msg = getAssetRegistry('model.Nutrition')
      .then((nutritionAssetRegistry) => {
    var nutrition = factory.newResource('model', 'Nutrition',tx.nutrition.nutritionId);
      nutrition.name = tx.nutrition.name;
      nutrition.type = tx.nutrition.type;
      nutrition.quantity = tx.nutrition.quantity;
      nutritionAssetRegistry.add(nutrition);
      });
        return getParticipantRegistry('model.Patient').then((patientRegistry) => {
           if(typeof tx.patient.nutrition !== 'object' || tx.patient.nutrition === null) {
    tx.patient.nutrition = [];
}
          
         tx.patient.nutrition.push(tx.nutrition);
         
            patientRegistry.update(tx.patient);
    });
    
}
/**
 * PatientAddNutrition transaction
 * @param {model.PatientAddPhysicalActivity} PatientAddPhysicalActivity
 * @transaction
 * @author Ines HBIBI
 */
async function PatientAddPhysicalActivity(tx) {    
    
    let factory = getFactory();
 
     var msg = getAssetRegistry('model.PhysicalActivity')
      .then((physicalActivityAssetRegistry) => {
    var physicalActivity = factory.newResource('model', 'PhysicalActivity',tx.physicalActivity.physicalId);
      physicalActivity.type = tx.physicalActivity.type;
      physicalActivity.duration = tx.physicalActivity.duration;
      physicalActivityAssetRegistry.add(physicalActivity);
      });
  
        return getParticipantRegistry('model.Patient').then((patientRegistry) => {
           if(typeof tx.patient.physicalActivity !== 'object' || tx.patient.physicalActivity !== Array) {
    tx.patient.physicalActivity = [];
}
         tx.patient.physicalActivity.push(tx.physicalActivity);
         
            patientRegistry.update(tx.patient);
    });
    
}

/**
 * PractitionerAddConsultation transaction
 * @param {model.PractitionerAddConsultation} PractitionerAddConsultation
 * @transaction
 * @author firas mrad
 */
async function PractitionerAddConsultation(tx) {    
    /**
     * Getting the Factory for creating new events and resources
     */
    let factory = getFactory();
    /**
     * Getting the Patient Registry to update the model later
     */
        return getParticipantRegistry('model.Patient').then((patientRegistry) => {
            /**
             * Pushing the new drug into the patient's pharmacy drug collection
             */
          if(typeof tx.patient.consultations !== 'object' || tx.patient.consultations !== Array) {
    tx.patient.consultations = [];
}
         tx.patient.consultations.push(tx.consultation);
         /**
          * Updating the patient with the new details
          */
            patientRegistry.update(tx.patient);
    }).then(() => {
        /**
         * Firing the event of completion
         */
        let event = factory.newEvent('model', 'PractitionerAddConsultationFinished');
        event.details = 'The Consultation dated :' + tx.consultation.consultionDate +' has been added successfully to ' + tx.patient.firstName + ' ' + tx.patient.lastName + '\'  medical record';
        console
        emit(event);
        });
    
}
/**
 * PractitionerAddAllergie transaction
 * @param {model.PractitionerAddAllergie} PractitionerAddAllergie
 * @transaction
 * @author firas mrad
 */
 async function PractitionerAddAllergie(tx) {    
    /**
     * Getting the Factory for creating new events and resources
     */
    let factory = getFactory();
    /**
     * Getting the Patient Registry to update the model later
     */
        return getParticipantRegistry('model.Patient').then((patientRegistry) => {
            /**
             * Pushing the new drug into the patient's pharmacy drug collection
             */
          if(typeof tx.patient.allergies !== 'object' || tx.patient.allergies !== Array) {
    tx.patient.allergies = [];
}
         tx.patient.allergies.push(tx.allergie);
         /**
          * Updating the patient with the new details
          */
            patientRegistry.update(tx.patient);
    }).then(() => {
        /**
         * Firing the event of completion
         */
        let event = factory.newEvent('model', 'PractitionerAddAllergieFinished');
        event.details = 'The Allergie :' + tx.allergie.name +' has been added successfully to ' + tx.patient.firstName + ' ' + tx.patient.lastName + '\'  medical record';
        console
        emit(event);
        });
    
}
/**
 * PractitionerAddMri transaction
 * @param {model.PractitionerAddMri} PractitionerAddMri
 * @transaction
 * @author firas mrad
 */
 async function PractitionerAddMri(tx) {    
    /**
     * Getting the Factory for creating new events and resources
     */
    let factory = getFactory();
    /**
     * Getting the Patient Registry to update the model later
     */
        return getParticipantRegistry('model.Patient').then((patientRegistry) => {
            /**
             * Pushing the new drug into the patient's pharmacy drug collection
             */
          if(typeof tx.patient.mriResults !== 'object' || tx.patient.mriResults !== Array) {
    tx.patient.mriResults = [];
}
         tx.patient.mriResults.push(tx.mri);
         /**
          * Updating the patient with the new details
          */
            patientRegistry.update(tx.patient);
    }).then(() => {
        /**
         * Firing the event of completion
         */
        let event = factory.newEvent('model', 'PractitionerAddMriFinished');
        event.details = 'The Mri dated :' + tx.patient.mriResults.testDate +' has been added successfully to ' + tx.patient.firstName + ' ' + tx.patient.lastName + '\'  medical record';
        console
        emit(event);
        });
    
}
/**
 * PractitionerAddLabRes transaction
 * @param {model.PractitionerAddLabRes} PractitionerAddLabRes
 * @transaction
 * @author firas mrad
 */
 async function PractitionerAddLabRes(tx) {    
    /**
     * Getting the Factory for creating new events and resources
     */
    let factory = getFactory();
    /**
     * Getting the Patient Registry to update the model later
     */
        return getParticipantRegistry('model.Patient').then((patientRegistry) => {
            /**
             * Pushing the new drug into the patient's pharmacy drug collection
             */
          if(typeof tx.patient.labTestResults !== 'object' || tx.patient.labTestResults !== Array) {
    tx.patient.labTestResults = [];
}
         tx.patient.labTestResults.push(tx.labTestResults);
         /**
          * Updating the patient with the new details
          */
            patientRegistry.update(tx.patient);
    }).then(() => {
        /**
         * Firing the event of completion
         */
        let event = factory.newEvent('model', 'PractitionerAddLabResFinished');
        event.details = 'The Lab test results dated :' + tx.patient.labTestResults.testDate +' has been added successfully to ' + tx.patient.firstName + ' ' + tx.patient.lastName + '\'  medical record';
        console
        emit(event);
        });
    
}
/**
 * PractitionerAddChronicDisease transaction
 * @param {model.PractitionerAddChronicDisease} PractitionerAddChronicDisease
 * @transaction
 * @author firas mrad
 */
 async function PractitionerAddChronicDisease(tx) {    
    /**
     * Getting the Factory for creating new events and resources
     */
    let factory = getFactory();
    /**
     * Getting the Patient Registry to update the model later
     */
        return getParticipantRegistry('model.Patient').then((patientRegistry) => {
            /**
             * Pushing the new drug into the patient's pharmacy drug collection
             */
          if(typeof tx.patient.chronicDiseases !== 'object' || tx.patient.chronicDiseases !== Array) {
    tx.patient.chronicDiseases = [];
}
         tx.patient.chronicDiseases.push(tx.chronicDisease);
         /**
          * Updating the patient with the new details
          */
            patientRegistry.update(tx.patient);
    }).then(() => {
        /**
         * Firing the event of completion
         */
        let event = factory.newEvent('model', 'PractitionerAddChronicDiseaseFinished');
        event.details = 'The Lab test results dated :' + tx.patient.labTestResults.testDate +' has been added successfully to ' + tx.patient.firstName + ' ' + tx.patient.lastName + '\'  medical record';
        console
        emit(event);
        });
    
}
