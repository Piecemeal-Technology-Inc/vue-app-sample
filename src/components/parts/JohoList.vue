<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="listData"
      :pagination.sync="pagination"
      item-key="name"
    >
      <template v-slot:headers="props">
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column', header.enableSort ? 'sortable' : '', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-icon v-if="header.enableSort" small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
          <th v-if="enableDeleteButton"><div><br /></div></th>
        </tr>
      </template>
      <template v-slot:items="props">
        <tr class="row-select" @click="selectRow(props.item)" @mousemove="showTooltip" @mouseout="hideTooltip"> 
          <td class="text-xs-left px-2">{{ props.item.name }}</td>
          <td class="text-xs-left px-2">{{ props.item.mailAddress }}</td>
          <td class="text-xs-center px-2">{{ props.item.phoneNo }}</td>
          <td class="text-xs-center px-2">{{ props.item.torokuNichiji }}</td>
          <td v-if="enableDeleteButton" class="px-1">
            <v-btn class="my-0 x-small-button" depressed small color="primary" @mousemove.stop="hideTooltip" @click.stop="deleteRow(props.index, props.item)">
              {{ $t('caption["削除"]') }}
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <Tooltip ref="Tooltip" />
  </div>
</template>

<script>
import Tooltip from "@/components/base/Tooltip";

export default {
  name: 'JohoList',
  props: {
    enableDeleteButton: {
      type: Boolean,
      default: false
    },
    listData: {
      type: Array,
      default: () => []
    },
    selectRow: {
      type: Function,
      default: function(){}
    },
    deleteRow: {
      type: Function,
      default: function(){}
    }
  },
  components: {
    Tooltip
  },
  data () {
    return {
      pagination: {
        sortBy: 'torokuNichiji',
        descending: 'desc'
      }
    }
  },
  computed: {
    headers: function() {
      let headers = [
        { text: this.$i18n.t('caption["名前"]'), enableSort: true, align: 'center', value: 'name'},
        { text: this.$i18n.t('caption["メールアドレス"]'), enableSort: true, align: 'center', value: 'mailAddress'},
        { text: this.$i18n.t('caption["電話番号"]'), enableSort: true, align: 'center', value: 'phoneNo'},
        { text: this.$i18n.t('caption["登録日時"]'), enableSort: true, align: 'center', value: 'torokuNichiji'},
      ];
      if (this.isNeedDeleteButton) headers.push({ text: '', enableSort: false, align: 'center', value: 'delete'}); 
      return headers;
    },
  },
  methods: {
    showTooltip(e) {
      this.$refs.Tooltip.show(e);
    },
    hideTooltip() {
      this.$refs.Tooltip.hide();
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
      } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
      }
    }
  }
}
</script>

<style lang="scss">
  .row-select {
    cursor:pointer;
  }

  // IE11対応で追加。
  // IE11のバグで、display: table, display: table-cellの中のmax-width: 100%は無視されてしまう。
  table.v-table {
    table-layout:fixed;
  }
</style>
