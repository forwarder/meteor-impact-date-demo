Session.setDefault('theme', 'default');

Template.registerHelper('theme', function() {
  return Session.get('theme');
});

Template.themePicker.events({
  'click [data-action="set-theme"]': function() {
    Session.set('theme', this.id);
  }
});

Template.themePicker.helpers({
  themes: function() {
    return [{
      id: 'default',
      name: 'Default'
    }, {
      id: 'bootstrap',
      name: 'Bootstrap'
    }, {
      id: 'material',
      name: 'Material design'
    }];
  },
  activeClass: function() {
    return Session.get('theme') === this.id && 'active' || '';
  }
});

var optionsSchema = new SimpleSchema({
  selected: {
    type: Date,
    label: 'The selected date',
    optional: true,
    autoform: {
      type: 'impact-date',
      showToday: true
    }
  },
  startDate: {
    type: Date,
    label: 'Open the picker at this date',
    optional: true,
    autoform: {
      type: 'impact-date',
      showToday: true
    }
  },
  min: {
    type: Date,
    label: 'Minimum date',
    optional: true,
    autoform: {
      type: 'impact-date'
    }
  },
  max: {
    type: Date,
    label: 'Maximum date',
    optional: true,
    autoform: {
      type: 'impact-date'
    }
  },
  showAdjacent: {
    type: Boolean,
    label: 'Show adjacent months',
    optional: true,
    defaultValue: false
  },
  weekStart: {
    type: Number,
    label: 'Start of the week, 1 is monday',
    optional: true,
    defaultValue: 1
  }
});

var standaloneCalendar = new ImpactCalendar();

Template.exampleStandalone.helpers({
  schema: function() {
    return optionsSchema;
  },
  calendar: function() {
    return standaloneCalendar;
  }
});

AutoForm.hooks({
  'standalone-form': {
    onSubmit: function(options) {
      this.event.preventDefault();
      standaloneCalendar.configure(options);
    }
  }
});

Template.exampleAutoForm.helpers({
  schema: function() {
    return new SimpleSchema({
      date: {
        type: Date,
        optional: true,
        min: moment().subtract(1, 'month').toDate(),
        max: moment().add(1, 'month').toDate(),
        autoform: {
          impactDateOptions: {
            showToday: true,
            theme: Session.get('theme')
          }
        }
      }
    });
  },
  value: function() {
    return new Date();
  }
});

AutoForm.hooks({
  'impact-date-form': {
    onSubmit: function(doc) {
      this.event.preventDefault();
      this.done();
    }
  }
});
