Component({
  data: {
    isExpand: false
  },
  methods: {
    handleExpand() {
      const { isExpand } = this.data;
      this.setData({
        isExpand: !isExpand
      });

      this.triggerEvent('scrollEvent', !isExpand);
    }
  }
})