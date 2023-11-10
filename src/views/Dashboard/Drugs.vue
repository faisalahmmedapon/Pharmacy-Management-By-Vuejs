<template>
  <div class="d-flex jc-between ai-center">
    <h2>All Drugs</h2>
    <TheButton @click="addModal = true">Add New</TheButton>
  </div>

  <div class="text-center" v-if="gettingDrugs">Loading......</div>
  <table class="mt-4" v-else>
    <thead>
      <tr>
        <th>Name</th>
        <th>Weight</th>
        <th>Type</th>
        <th>Vendor</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="drug in drugs" :key="drug.name">
        <td>{{ drug.name }}</td>
        <td>{{ drug.weight }}</td>
        <td>{{ drug.type }}</td>
        <td>{{ drug.vendor }}</td>
        <td>{{ drug.price }}</td>
        <td>{{ drug.quantity }}</td>
        <td>
          <img
            src="/img/edit.png"
            alt=""
            class="action-icon"
            @click="
              selectedDrug = drug;
              editModal = true;
            "
          />
          <img
            src="/img/trash.png"
            alt=""
            class="action-icon action-icon--delete ml-3"
            @click="
              selectedDrug = drug;
              deleteModal = true;
            "
          />
        </td>
      </tr>
    </tbody>
  </table>

  <TheModal v-model="addModal" heading="Add New Drug">
    <form action="" @submit.prevent="addNew">
      <label class="block">Select Drug Type</label>
      <div class="mt-2">
        <label>
          <input
            type="radio"
            name="drugtype"
            value="Tab"
            v-model="newDrug.type"
          />
          Tab
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Capsule"
            v-model="newDrug.type"
          />
          Capsule
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Syrup"
            v-model="newDrug.type"
          />
          Syrup
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Suppository"
            v-model="newDrug.type"
          />
          Suppository
        </label>
      </div>

      <label class="block mt-3">Drug Name</label>
      <input
        type="text"
        placeholder="Drug Name"
        class="mt-1 w-100"
        v-model="newDrug.name"
      />

      <label class="block mt-3">Weight</label>
      <input
        type="text"
        placeholder="weight in mg"
        class="mt-1 w-100"
        v-model="newDrug.weight"
      />

      <label class="block mt-3">Vendor</label>
      <select v-model="newDrug.vendor">
        <option value="">Select One</option>
        <option
          v-for="vendor in vendors"
          :key="vendor.name"
          :value="vendor.name"
        >
          {{ vendor.name }}
        </option>
      </select>

      <label class="block mt-3">Price</label>
      <input
        type="text"
        placeholder="Pack Price"
        class="mt-1 w-100"
        v-model="newDrug.price"
      />

      <label class="block mt-3">Quantity</label>
      <input
        type="number"
        placeholder="Enter Quantity"
        class="mt-1 w-100"
        v-model="newDrug.quantity"
      />

      <TheButton :loading="adding" class="w-100 mt-3">Add</TheButton>
    </form>
  </TheModal>

  <TheModal v-model="editModal" heading="Edit Drug">
    <form action="" @submit.prevent="editDrug">
        <label class="block">Select Drug Type</label>
      <div class="mt-2">
        <label>
          <input
            type="radio"
            name="drugtype"
            value="Tab"
            v-model="selectedDrug.type"
          />
          Tab
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Capsule"
            v-model="selectedDrug.type"
          />
          Capsule
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Syrup"
            v-model="selectedDrug.type"
          />
          Syrup
        </label>

        <label class="ml-2">
          <input
            type="radio"
            name="drugtype"
            value="Suppository"
            v-model="selectedDrug.type"
          />
          Suppository
        </label>
      </div>

      <label class="block mt-3">Drug Name</label>
      <input
        type="text"
        placeholder="Drug Name"
        class="mt-1 w-100"
        v-model="selectedDrug.name"
      />

      <label class="block mt-3">Weight</label>
      <input
        type="text"
        placeholder="weight in mg"
        class="mt-1 w-100"
        v-model="selectedDrug.weight"
      />

      <label class="block mt-3">Vendor</label>
      <select v-model="selectedDrug.vendor">
        <option value="">Select One</option>
        <option
          v-for="vendor in vendors"
          :key="vendor.name"
          :value="vendor.name"
        >
          {{ vendor.name }}
        </option>
      </select>

      <label class="block mt-3">Price</label>
      <input
        type="text"
        placeholder="Pack Price"
        class="mt-1 w-100"
        v-model="selectedDrug.price"
      />

      <label class="block mt-3">Quantity</label>
      <input
        type="number"
        placeholder="Enter Quantity"
        class="mt-1 w-100"
        v-model="selectedDrug.quantity"
      />
      <TheButton :loading="editing" class="w-100 mt-3">Save Changes </TheButton>
    </form>
  </TheModal>

  <TheModal v-model="deleteModal" heading="Are you sure ?">
    <p>
      Do you want to really want to delete
      <strong> {{ selectedDrug.name }} </strong>
    </p>
    <div class="mt-4 jc-between">
      <TheButton @click="deleteModal = false" color="gray">No</TheButton>
      <TheButton class="ml-5" @click="deleteDrug" :loading="deleting"
        >Yes</TheButton
      >
    </div>
  </TheModal>
</template>

<script>
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
import { showErrorMessage } from "../../utils/function";
import privateService from "../../service/privateService";
export default {
  data: () => ({
    addModal: false,
    deleteModal: false,
    editModal: false,

    newDrug: {
      name: "",
      weight: "",
      type: "",
      vendor: "",
      price: "",
      quantity: "",
    },
    selectedDrug: {},
    deleting: false,
    editing: false,
    adding: false,
    drugs: [],
    gettingDrugs: false,
    vendors: [],
  }),

  mounted() {
    setTimeout(this.getAllDrugs, 100);
    setTimeout(this.getAllVendors, 100);
  },

  methods: {
    resetFrom() {
      this.newDrug = {
        name: "",
        weight: "",
        type: "",
        vendor: "",
        price: "",
        quantity: "",
      };
    },

    getAllDrugs() {
      this.gettingDrugs = true;
      privateService
        .getDrugs()
        .then((res) => {
          // console.log(res);
          this.drugs = res.data.drugs;
        })
        .catch((err) => {
          showErrorMessage("Error", "Something went wrong! Try next time");
        })
        .finally(() => {
          this.gettingDrugs = false;
        });
    },
    getAllVendors() {
      // this.gettingDrugs = true;
      privateService
        .getVendors()
        .then((res) => {
          this.vendors = res.data.vendors;
        })
        .catch((err) => {
          showErrorMessage(err);
        })
        .finally(() => {
          // this.gettingDrugs = false;
        });
    },
    addNew() {
      this.adding = true;
      privateService
        .addDrug(this.newDrug)
        .then((res) => {
          showErrorMessage("Success", res.data.message);
          this.addModal = false;
          this.resetFrom();
          this.getAllDrugs();
        })
        .catch((err) => {
          showErrorMessage("Error", "Something went wrong! Try next time");
        })
        .finally(() => {
          this.adding = false;
        });
    },

    deleteDrug() {
      this.deleting = true;
      let token = localStorage.getItem("accessToken");
      privateService
        .deleteDrug(this.selectedDrug.id)
        .then((res) => {
          showErrorMessage("Success", res.data.message);
          this.deleteModal = false;
          this.getAllDrugs();
        })
        .catch((err) => {
          showErrorMessage("Error", "Something went wrong! Try next time");
        })
        .finally(() => {
          this.deleting = false;
        });
    },
    editDrug() {
      this.editing = true;
      privateService
        .editDrug(this.selectedDrug)
        .then((res) => {
          showErrorMessage("Success", res.data.message);
          this.editModal = false;
        })
        .catch((err) => {
          showErrorMessage("Error", "Something went wrong! Try next time");
        })
        .finally(() => {
          this.editing = false;
        });
    },
  },
  components: {
    TheButton,
    TheModal,
  },
};
</script>
