#include "pch.h"
#include <algorithm>
#include "JSValueReader.h"
#include "JSValueXaml.h"

#include "ProgressBarViewManager.h"

using namespace winrt;
using namespace Windows::Foundation;
using namespace Windows::Foundation::Collections;

using namespace Windows::UI::Xaml;
using namespace Windows::UI::Xaml::Media;
using namespace Microsoft::UI::Xaml::Controls;

using namespace Microsoft::ReactNative;

namespace winrt::progressbarapp::implementation {

    ProgressBarViewManager::ProgressBarViewManager() {}

    // IViewManager
    hstring ProgressBarViewManager::Name() noexcept {
        return L"MUXCProgressBar";
    }

    FrameworkElement ProgressBarViewManager::CreateView() noexcept {
        auto const& view = winrt::Microsoft::UI::Xaml::Controls::ProgressBar();
        return view;
    }

    // IViewManagerWithNativeProperties
    IMapView<hstring, ViewManagerPropertyType> ProgressBarViewManager::NativeProps() noexcept {
        auto nativeProps = winrt::single_threaded_map<hstring, ViewManagerPropertyType>();

        nativeProps.Insert(L"progress", ViewManagerPropertyType::Number);
        nativeProps.Insert(L"indeterminate", ViewManagerPropertyType::Boolean);
        nativeProps.Insert(L"borderWidth", ViewManagerPropertyType::Number);
        nativeProps.Insert(L"color", ViewManagerPropertyType::Color);
        nativeProps.Insert(L"unfilledColor", ViewManagerPropertyType::Color);
        nativeProps.Insert(L"showPaused", ViewManagerPropertyType::Boolean);
        nativeProps.Insert(L"showError", ViewManagerPropertyType::Boolean);

        return nativeProps.GetView();
    }

    void ProgressBarViewManager::UpdateProperties(FrameworkElement const& view, IJSValueReader const& propertyMapReader) noexcept {
        if (auto control = view.try_as<winrt::Microsoft::UI::Xaml::Controls::ProgressBar>()) {
            JSValueObject propertyMap = JSValueObject::ReadFrom(propertyMapReader);

            for (auto const& pair : propertyMap) {
                auto const& propertyName = pair.first;
                auto const& propertyValue = pair.second;

                if (propertyName == "progress") {
                    auto value = propertyValue.AsDouble() * 100.0;
                    control.Value(value);
                }
                else if (propertyName == "indeterminate") {
                    auto value = propertyValue.AsBoolean();
                    control.IsIndeterminate(value);
                }
                else if (propertyName == "borderWidth") {
                    auto value = std::max(0.0, propertyValue.AsDouble());
                    control.BorderThickness(winrt::Windows::UI::Xaml::ThicknessHelper::FromUniformLength(value));
                }
                else if (propertyName == "color") {
                    if (auto value = propertyValue.To<winrt::Windows::UI::Xaml::Media::Brush>()) {
                        control.Foreground(value);
                    }
                    else {
                        control.ClearValue(winrt::Windows::UI::Xaml::Controls::Control::ForegroundProperty());
                    }
                }
                else if (propertyName == "unfilledColor") {
                    if (auto value = propertyValue.To<Brush>()) {
                        control.Background(value);
                    }
                    else {
                        control.ClearValue(winrt::Windows::UI::Xaml::Controls::Control::BackgroundProperty());
                    }
                }
                else if (propertyName == "showPaused") {
                    auto value = propertyValue.AsBoolean();
                    control.ShowPaused(value);
                }
                else if (propertyName == "showError") {
                    auto value = propertyValue.AsBoolean();
                    control.ShowError(value);
                }
            }
        }
    }

} // namespace winrt::progressbarapp::implementation