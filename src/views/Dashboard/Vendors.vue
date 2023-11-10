<template>
  <div class="d-flex jc-between ai-center">
    <h2>All Vendors</h2>
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
import { showErrorMessage } from "../../utils/function";
import privateService from "../../service/privateService";
export default {
  data: () => ({
    addModal: false,
    deleteModal: false,
    editModal: false,

    newVendor: {
      name: "",
      description: "",
    },
    selectedVendor: {},
    deleting: false,
    editing: false,
    adding: false,
    vendors: [],
    gettingVendors: false,
  }),

  mounted() {
    setTimeout(this.getAllVendors, 100);
  },

  methods: {
    resetFrom() {
      this.newVendor = {
        name: "",
        description: "",
      };
    },

    getAllVendors() {
      this.gettingVendors = true;
      privateService
        .getVendors()
        .then((res) => {
          // console.log(res);
          this.vendors = res.data.vendors;
        })
        .catch((err) => {
          showErrorMessage("Error", "Something went wrong! Try next time");
        })
        .finally(() => {
          this.gettingVendors = false;
        });
    },

    addNew() {
      this.adding = true;
      privateService
        .addVendor(this.newVendor)
        .then((res) => {
          showErrorMessage("Success", res.data.message);
          this.addModal = false;
          this.resetFrom();
          this.getAllVendors();
        })
        .catch((err) => {
          showErrorMessage("Error", "Something went wrong! Try next time");
        })
        .finally(() => {
          this.adding = false;
        });
    },

    deleteVendor() {
      this.deleting = true;
      let token = localStorage.getItem("accessToken");
      privateService
        .deleteVendor(this.selectedVendor.id)
        .then((res) => {
          showErrorMessage("Success", res.data.message);
          this.deleteModal = false;
          this.getAllVendors();
        })
        .catch((err) => {
          showErrorMessage("Error", "Something went wrong! Try next time");
        })
        .finally(() => {
          this.deleting = false;
        });
    },
    editVendor() {
      this.editing = true;
      privateService
        .editVendor(this.selectedVendor)
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
