'use strict';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import RadioForm from 'react-native-simple-radio-button';

class TitleBox extends React.Component {
  styles = StyleSheet.create({
    container: {
      flex: 0,
      flexDirection: 'row',
      marginLeft: 21,
      marginRight: 21,
      marginBottom: 7,
      marginTop: 7,
    },
    text: {
      fontSize: 25,
      fontFamily: 'Segoe UI',
      fontWeight: '100'
    },
  });

  render() {
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.text}>ProgressBar</Text>
      </View>
    );
  }
}

class HeaderBox extends React.Component {
  styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    text: {
      fontFamily: 'Segoe UI',
    },
  });

  render() {
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.text}>The ProgressBar has two different visual representations:</Text>
        <Text style={this.styles.text}>Indeterminate - shows that a task is ongoing, but doesn't block user interaction.</Text>
        <Text style={this.styles.text}>Determinate - shows how much progress has been made on a known amount of work.</Text>
      </View>
    );
  }
}

class ProgressBarDemo extends React.Component {
  state = {
    progressBarValue: 0,
    progressBarValueText: '',
    progressBarWidth: 130,
    progressBarPaused: false,
    progressBarError: false,
  };

  styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      marginTop: 28,
    },
    headerText: {
      fontSize: 21,
      fontFamily: 'Segoe UI',
    },
    mainBox: {
      borderColor: 'rgb(230, 230, 230)',
      borderWidth: 1,
      marginTop: 21,
    },
    sampleBox: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: 21,
      paddingBottom: 21,
      paddingLeft: 14,
      paddingRight: 14,
    },
    progressBarBox: {
      flexGrow: 1,
      flexDirection: 'column',
    },
    progressBar: {
    },
    radioBox: {
      flexGrow: 1,
      backgroundColor: 'rgb(242, 242, 242)',
      maxWidth: 150,
      padding: 14,
    },
    radioHeader: {
      paddingBottom: 7,
    },
    radioForm: {
    },
    radioLabel: {
      paddingBottom: 7,
    },
    inputBox: {
      flexGrow: 3,
      flexDirection: 'row',
      padding: 14,
    },
    inputHeader: {
      padding: 7,
    },
    textInput: {
      borderColor: 'rgb(102, 102, 102)',
    },
    inputButton: {
      paddingTop: 7,
      paddingBottom: 7,
      paddingLeft: 14,
      paddingRight: 14,
      borderColor: 'rgb(102, 102, 102)',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderRightWidth: 1,
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    inputButtonDisabled: {
      borderColor: 'rgb(204, 204, 204)',
      backgroundColor: 'rgb(204, 204, 204)',
    },
    codeBox: {
      backgroundColor: 'rgb(230, 230, 230)',
      paddingTop: 21,
      paddingBottom: 21,
      paddingLeft: 14,
      paddingRight: 14,
    },
    codeText: {
      fontFamily: 'Consolas',
    },
  });

  componentDidMount() {
    if (!this.props.indeterminate && this._input) {
      console.log(this._input);
    }
  }

  onRadioPress(value) {
    switch (value) {
      case 'Running':
        this.setState({progressBarPaused: false, progressBarError: false})
        break;
      case 'Paused':
        this.setState({progressBarPaused: true, progressBarError: false})
        break;
      case 'Error':
        this.setState({progressBarPaused: false, progressBarError: true})
        break;
    }
  }

  onValueInput(textInput) {
    let value = 0;
    const rawValue = parseInt(textInput);
    if (!isNaN(rawValue)) {
      value = rawValue;
    }
    this.setValue(value);
  }

  setValue(value) {
    const boundValue = Math.max(0, Math.min(100, value));
    if (boundValue !== this.state.progressBarValue) {
      this.setState({progressBarValue: boundValue, progressBarValueText: boundValue.toString()});
    }
  }

  incValue() {
    this.setValue(this.state.progressBarValue + 1);
  }

  decValue() {
    this.setValue(this.state.progressBarValue - 1);
  }

  render() {
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.headerText}>{this.props.header}</Text>
        <View style={this.styles.mainBox} >
          <View style={this.styles.sampleBox} >
            <View style={this.styles.progressBarBox} >
              <ProgressBar style={this.styles.progressBar} progress={this.state.progressBarValue / 100} indeterminate={this.props.indeterminate} height={4} width={this.state.progressBarWidth} borderWidth={0} color='rgb(0, 120, 212)' unfilledColor='rgb(204, 204, 204)' />
            </View>
            { this.props.indeterminate &&
            <View style={this.styles.radioBox}>
              <Text style={this.styles.radioHeader}>Progress state</Text>
              <RadioForm
                radio_props={[
                  { label: 'Running', value: 'Running' },
                  { label: 'Paused', value: 'Paused' },
                  { label: 'Error', value: 'Error' },
                ]}
                initial={0}
                onPress={value => {this.onRadioPress(value)}}
                style={this.styles.radioForm}
                buttonColor='rgb(97, 97, 97)'
                selectedButtonColor='rgb(0, 120, 212)'
                buttonSize={11}
                labelStyle={this.styles.radioLabel}
              />
            </View>
            }
            { !this.props.indeterminate &&
            <View style={this.styles.inputBox}>
              <Text style={this.styles.inputHeader}>Progress</Text>
              <TextInput
                style={this.styles.textInput}
                value={this.state.progressBarValueText}
                onChangeText={text => {this.onValueInput(text)}}
              />
              <TouchableOpacity style={[this.styles.inputButton, this.state.progressBarValue == 100 && this.styles.inputButtonDisabled]} onPress={this.incValue.bind(this)}><Text>⬆️</Text></TouchableOpacity>
              <TouchableOpacity style={[this.styles.inputButton, this.state.progressBarValue == 0 && this.styles.inputButtonDisabled]} onPress={this.decValue.bind(this)}><Text>⬇️</Text></TouchableOpacity>
            </View>
            }
          </View>
          <View style={this.styles.codeBox} >
            <Text style={this.styles.codeText}>
              <XmlStartText ns='muxc' name='ProgressBar' />
              <XmlAttributeText name="Width" value={this.state.progressBarWidth} />
              { this.props.indeterminate && <XmlAttributeText name="IsIndeterminate" value={this.props.indeterminate ? 'True' : 'False'} /> }
              { !this.props.indeterminate && <XmlAttributeText name="Value" value={this.state.progressBarValue} /> }
              { this.props.indeterminate && <XmlAttributeText name="ShowPaused" value={this.state.progressBarPaused ? 'True' : 'False'} /> }
              { this.props.indeterminate && <XmlAttributeText name="ShowError" value={this.state.progressBarError ? 'True' : 'False'} /> }
              <XmlEndText />
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

class XmlStartText extends React.Component {
  render() {
    return (
      <Text>
        <Text style={{color: 'blue'}}>{'<'}</Text>
        <Text style={{color: 'maroon'}}>{this.props.ns}</Text>
        <Text style={{color: 'blue'}}>{':'}</Text>
        <Text style={{color: 'maroon'}}>{this.props.name + ' '}</Text>
      </Text>
    );
  }
}

class XmlAttributeText extends React.Component {
  render() {
    return (
      <Text>
        <Text style={{color: 'red'}}>{this.props.name}</Text>
        <Text style={{color: 'blue'}}>{'='}</Text>
        <Text style={{color: 'black'}}>{'"'}</Text>
        <Text style={{color: 'blue'}}>{'' + this.props.value}</Text>
        <Text style={{color: 'black'}}>{'" '}</Text>
      </Text>
    );
  }
}

class XmlEndText extends React.Component {
  render() {
    return (
      <Text style={{color: 'blue'}}>{'/>'}</Text>
    );
  }
}

class FooterBox extends React.Component {
  styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    containerRow: {
      flex: 1,
      flexDirection: 'row',
    },
    headerText: {
      fontSize: 21,
      fontFamily: 'Segoe UI',
    },
  });
  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.containerRow}>
          <LinkBox header="View page code on GitHub" links={['XAML source code', 'C# source code']} />
          <LinkBox header="Related controls" links={['ProgressRing']}/>
        </View>
        <View style={this.styles.containerRow}>
          <LinkBox header="Documentation" links={['ProgressBar - API', 'Guidelines']}/>
          <LinkBox header="Feedback" links={['Send feedback about this page']}/>
        </View>
      </View>
    );
  }
}

class LinkBox extends React.Component {
  styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      marginTop: 28,
    },
    headerText: {
      fontSize: 21,
      fontFamily: 'Segoe UI',
    },
    linkText: {
      fontFamily: 'Segoe UI',
      color: 'rgb(0, 120, 212)',
      marginTop: 7,
      marginBottom: 14,
    },
  });
  render() {
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.headerText}>{this.props.header}</Text>
        {this.props.links.map((str, i) => <Text key={i} style={this.styles.linkText}>{str}</Text> )}
      </View>
    );
  }
}

class App extends React.Component {
  state = {
  };

  styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    scrollBox: {
      marginLeft: 21,
      marginRight: 21,
      marginBottom: 7,
      marginTop: 7,
    },
  });

  render() {
    return (
      <View style={this.styles.container}>
        <TitleBox />
        <ScrollView style={this.styles.scrollBox}>
        <HeaderBox />
        <ProgressBarDemo header='An indeterminate progress bar.' indeterminate={true} />
        <ProgressBarDemo header='A determinate progress bar.' />
        <FooterBox />
      </ScrollView>
      </View>
    );
  }
}

export default App;
