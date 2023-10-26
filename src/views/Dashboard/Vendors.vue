<template>
  <div class="d-flex jc-between ai-center">
    <h2>All vendors</h2>
    <TheButton @click="addModal = true">Add New</TheButton>
  </div>

  <div class="text-center" v-if="gettingVendors">Loading......</div>
  <table class="mt-4" v-else>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vendor in vendors" :key="vendor.name">
        <td>{{ vendor.name }}</td>
        <td>{{ vendor.description }}</td>
        <td>
          <img
            src="/img/edit.png"
            alt=""
            class="action-icon"
            @click="
              selectedVendor = vendor;
              editModal = true;
            "
          />
          <img
            src="/img/trash.png"
            alt=""
            class="action-icon action-icon--delete ml-3"
            @click="
              selectedVendor = vendor;
              deleteModal = true;
            "
          />
        </td>
      </tr>
    </tbody>
  </table>

  <TheModal v-model="addModal" heading="Add New Vendor">
    <form action="" @submit.prevent="addNew">
      <div class="mt-3">
        <label for="">Vendor Name</label>
        <input
          type="text"
          placeholder="Enter vendor name"
          class="w-100"
          v-model="newVendor.name"
        />
      </div>
      <div class="mt-3">
        <label for="">Vendor Description</label>
        <input
          type="text"
          placeholder="Write short description"
          class="w-100"
          v-model="newVendor.description"
        />
      </div>
      <TheButton :loading="adding" class="w-100 mt-3">Add</TheButton>
    </form>
  </TheModal>

  <TheModal v-model="editModal" heading="Edit Vendor">
    <form action="" @submit.prevent="editVendor">
      <div class="mt-3">
        <label for="">Vendor Name</label>
        <input
          type="text"
          placeholder="Enter vendor name"
          class="w-100"
          v-model="selectedVendor.name"
        />
      </div>
      <div class="mt-3">
        <label for="">Vendor Description</label>
        <input
          type="text"
          placeholder="Write short description"
          class="w-100"
          v-model="selectedVendor.description"
        />
      </div>
      <TheButton :loading="editing" class="w-100 mt-3">Save Changes </TheButton>
    </form>
  </TheModal>

  <TheModal v-model="deleteModal" heading="Are you sure ?">
    <p>
      Do you want to really want to delete
      <strong> {{ selectedVendor.name }} </strong>
    </p>
    <div class="mt-4 jc-between">
      <TheButton @click="deleteModal = false" color="gray">No</TheButton>
      <TheButton class="ml-5" @click="deleteVendor" :loading="deleting"
        >Yes</TheButton
      >
    </div>
  </TheModal>
</template>

<script>
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
import axios from "axios";

import { eventBus } from "../../utils/eventBus";
import { showErrorMessage } from "../../utils/function";
export default {
  data: () => ({
    addModal: false,
    editModal: false,
    deleteModal: false,

    newVendor: {
      name: "",
      description: "",
    },

    selectedVendor: {},

    adding: false,
    editing: false,
    deleting: false,

    gettingVendors: false,
    vendors: [],
  }),

  mounted() {
    this.getAllVendors();
  },

  methods: {
    getAllVendors() {
      this.gettingVendors = true;
      let token = localStorage.getItem("accessToken");
      axios
        .get("http://127.0.0.1:8000/api/v1/vendors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.vendors = res.data.vendors;

          //console.log(res.data.vendors);
        })
        .catch((err) => {
          // if get any error using login from
          // console.log(err);

          showErrorMessage("Error", "Something went wrong! Try next time");
        })
        .finally(() => {
          this.gettingVendors = false;
        });
    },
    resetFrom() {
      this.newVendor = {
        name: "",
        description: "",
      };
    },
    addNew() {
      // console.log(this.newVendor);

      this.adding = true;
      let token = localStorage.getItem("accessToken");
      //  console.log(token);
      axios
        .post("http://127.0.0.1:8000/api/v1/vendors", this.newVendor, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // after successfully login toaster

          showErrorMessage("Success", res.data.message);

          // after successfully create this items from work
          this.addModal = false;
          this.resetFrom();
          this.getAllVendors();
        })
        .catch((err) => {
          // if get any error using login from
          // console.log(err);

          showErrorMessage("Error", "Something went wrong! Try next time");
        })
        .finally(() => {
          this.adding = false;
        });
    },

    deleteVendor() {
      //console.log('deleteVendor');

      this.deleting = true;
      let token = localStorage.getItem("accessToken");
      //  console.log(token);
      axios
        .delete(
          "http://127.0.0.1:8000/api/v1/vendors/" + this.selectedVendor.id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // after successfully login toaster

          showErrorMessage("Success", res.data.message);

          this.deleteModal = false;
          this.getAllVendors();
        })
        .catch((err) => {
          // if get any error using login from
          // console.log(err);

          showErrorMessage("Error", "Something went wrong! Try next time");
        })
        .finally(() => {
          this.deleting = false;
        });
    },
    editVendor() {
      //console.log('deleteVendor');

      this.editing = true;
      let token = localStorage.getItem("accessToken");
      //  console.log(token);
      axios
        .put(
          "http://127.0.0.1:8000/api/v1/vendors/" + this.selectedVendor.id,
          this.selectedVendor,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          // after successfully login toaster
          showErrorMessage("Success", res.data.message);

          this.editModal = false;
        })
        .catch((err) => {
          // if get any error using login from
          // console.log(err);
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
