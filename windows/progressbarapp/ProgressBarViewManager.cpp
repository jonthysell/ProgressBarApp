#include "pch.h"

#include "ProgressBarViewManager.h"

using namespace winrt;

using namespace Windows::UI::Xaml;
using namespace Microsoft::UI::Xaml::Controls;

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

} // namespace winrt::progressbarapp::implementation