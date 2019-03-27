Component({
  properties: {
    isExpand: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    handleClose() {
      this.triggerEvent('close');
    }
  }
})