<template>
  <div>
    <Note
      v-for="note in notes"
      :active-note="activeNote"
      :note="note.note"
      :shortcut="note.shortcut"
      :on-mouse-down="onMouseDown"
      :key="note.note"
    />
  </div>
</template>

<script>
import Note from './Note.vue';

export default {
  name: 'NoteRow',
  components: {
    Note,
  },
  props: {
    activeNote: String,
    notes: Array,
    onMouseDown: Function,
  },
};
</script>
