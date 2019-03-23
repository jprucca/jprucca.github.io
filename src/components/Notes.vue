<template>
  <div>
    <NoteRow
      :active-note="activeNote"
      :notes="notesRow1"
      :on-mouse-down="playSound"
    />
    <br>
    <NoteRow
      :active-note="activeNote"
      :notes="notesRow2"
      :on-mouse-down="playSound"
    />
    <br>
    <NoteRow
      :active-note="activeNote"
      :notes="notesRow3"
      :on-mouse-down="playSound"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NoteRow from './NoteRow.vue';

export default {
  name: 'Notes',
  components: {
    NoteRow,
  },
  computed: {
    ...mapGetters([
      'activeNote',
      'notesRow1',
      'notesRow2',
      'notesRow3',
    ]),
  },
  methods: {
    ...mapActions([
      'playSound',
    ]),
  },
};
</script>
