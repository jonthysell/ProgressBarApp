#pragma once

#include "winrt/Microsoft.ReactNative.h"

namespace winrt::progressbarapp::implementation {

    struct ProgressBarViewManager
        : winrt::implements<
        ProgressBarViewManager,
        winrt::Microsoft::ReactNative::IViewManager,
        winrt::Microsoft::ReactNative::IViewManagerWithNativeProperties> {
    public:
        ProgressBarViewManager();

        // IViewManager
        winrt::hstring Name() noexcept;

        winrt::Windows::UI::Xaml::FrameworkElement CreateView() noexcept;

        // IViewManagerWithNativeProperties
        winrt::Windows::Foundation::Collections::IMapView<winrt::hstring, winrt::Microsoft::ReactNative::ViewManagerPropertyType> NativeProps() noexcept;

        void UpdateProperties(winrt::Windows::UI::Xaml::FrameworkElement const& view, winrt::Microsoft::ReactNative::IJSValueReader const& propertyMapReader) noexcept;
    };

} // namespace winrt::progressbarapp::implementation